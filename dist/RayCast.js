"use strict";
var Utils_1 = require("./Utils");
// default castRays configuration
exports.defaultConfig = {
    rayCount: 256,
    fov: (Math.PI / 2),
    fisheye: false,
    center: true
};
/**
 * Cast one ray from position until test fails
 * @param {number[][]} map - 2d world on which will be casted ray
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {testintersection} intersection - test function is called on every intersection. If fails, fuction will return IRay
 * @param {number} rayRot - camera's rot in radians
 * @return {IRay} information about ray, check IRay type
 */
exports.castRay = function (map, x, y, intersection, rayRot) {
    var angleSin = Math.sin(rayRot);
    var angleCos = Math.cos(rayRot);
    var quadrant = Utils_1.getQuadrant(rayRot); // in which quadrant is ray looking to
    // current cell position in map
    var column = Math.floor(x);
    var row = Math.floor(y);
    var hSlope = (angleSin / angleCos); // tan
    var vSlope = (angleCos / angleSin); // ctan
    // NS intersection with cell
    var stepX = (quadrant & 2 /* RIGTH */) ? 1 : -1;
    var hdY = (stepX * hSlope);
    // WE intersection with cell
    var stepY = (quadrant & 1 /* TOP */) ? -1 : 1;
    var vdX = (stepY * vSlope);
    // first WE intesection world coordinates in world
    var hHitX = (quadrant & 2 /* RIGTH */) ? Math.ceil(x) : column;
    var hHitY = y + ((hHitX - x) * hSlope);
    // first NS intersection world coordinates in world
    var vHitY = (quadrant & 1 /* TOP */) ? row : Math.ceil(y);
    var vHitX = x + ((vHitY - y) * vSlope);
    // distance from current point to nearest x || y side
    var sideDistX = Math.sqrt(Math.pow((hHitX - x), 2) + Math.pow((hHitY - y), 2));
    var sideDistY = Math.sqrt(Math.pow((vHitX - x), 2) + Math.pow((vHitY - y), 2));
    // distance from x || y  side to another x || y side
    var deltaDistX = Math.sqrt(Math.pow(stepX, 2) + Math.pow(hdY, 2));
    var deltaDistY = Math.sqrt(Math.pow(vdX, 2) + Math.pow(stepY, 2));
    var side = (sideDistX < sideDistY) ? 0 /* NS */ : 1 /* WE */; // NS or WE wall hit ?
    var dist = (sideDistX < sideDistY) ? sideDistX : sideDistY; // initial distance from caster to intersection
    var i = 0; // number of intersections
    // @todo send hitX and hitY to test function
    while (intersection(row, column, map[row][column], dist, i)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            hHitX += stepX;
            hHitY += hdY;
            // vars passed to testfunction
            column += stepX;
            dist = sideDistX;
            side = 0 /* NS */;
        }
        else {
            sideDistY += deltaDistY;
            vHitX += vdX;
            vHitY += stepY;
            // vars passed to testfunction
            row += stepY;
            dist = sideDistY;
            side = 1 /* WE */;
        }
        i++;
    }
    return {
        // ray distance from caster
        dist: (side === 0 /* NS */)
            ? (sideDistX - deltaDistX)
            : (sideDistY - deltaDistY),
        // side, which was hit. NS or WE
        side: side,
        // ray x hit
        x: (side === 1 /* WE */)
            ? (vHitX - vdX)
            : (hHitX - stepX),
        // ray y hit
        y: (side === 1 /* WE */)
            ? (vHitY - stepY)
            : (hHitY - hdY),
        // ray rot
        rot: rayRot,
        // ray row hit
        row: row,
        // ray column hit
        column: column
    };
};
/**
 * Cast rays from position in world
 * @param {number[][]} map - 2d world on which will be casted ray
 * @param {number} x - camera coordinate in map
 * @param {number} y - camera coordinate in map
 * @param {testintersection} intersection - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @param {IRayConf} config - additional configuration
 * @return {IRay[]} all rays casted from position, check IRay type
 */
exports.castRays = function (map, x, y, rot, intersection, config) {
    if (config === void 0) { config = exports.defaultConfig; }
    var castRayFromPosition = function (rayRot) { return exports.castRay(map, x, y, intersection, Utils_1.normalizeAngle(rayRot)); };
    var dRot = (config.fov / config.rayCount); // difference between each ray rot
    var center = config.center // start casting ray from center of FOV ?
        ? (rot - (config.fov / 2))
        : (rot - (config.fov / 2));
    var rays = []; // casted rays
    var i = 0;
    if (config.fisheye) {
        while (i < config.rayCount) {
            // it's important to normalize rot before casting it, to make sure that rot will continue in direction
            rays.push(castRayFromPosition((i * dRot) + center));
            i++;
        }
    }
    else {
        while (i < config.rayCount) {
            // it's important to normalize rot before casting it, to make sure that rot will continue in direction
            // also remove fisheye effect
            rays.push(Utils_1.removeFisheye(castRayFromPosition((i * dRot) + center), rot));
            i++;
        }
    }
    return rays;
};
