"use strict";
var Utils_1 = require('./Utils');
// default castRays configuration
var defaultConfig = {
    count: 256,
    fov: (Math.PI / 2),
    fisheye: false,
    center: true
};
/**
 * Cast one ray from position until test fails
 * @param {Array<Array<number>>} map - 2d world on which will be casted ray
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {testintersection} intersection - test function is called on every intersection. If fails, fuction will return IRay
 * @param {number} rayRot - rot of ray in radians
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
    // horizontal intersection with cell
    var stepX = (quadrant.right) ? 1 : -1;
    var hdY = stepX * hSlope;
    // vertical intersection with cell
    var stepY = (quadrant.top) ? -1 : 1;
    var vdX = stepY * vSlope;
    // first horizontal intesection world coordinates in world
    var hHitX = (quadrant.right) ? Math.ceil(x) : column;
    var hHitY = y + ((hHitX - x) * hSlope);
    // first vertical intersection world coordinates in world
    var vHitY = (quadrant.top) ? row : Math.ceil(y);
    var vHitX = x + ((vHitY - y) * vSlope);
    // distance from current point to nearest x || y side
    var sideDistX = Math.sqrt(Math.pow((hHitX - x), 2) + Math.pow((hHitY - y), 2));
    var sideDistY = Math.sqrt(Math.pow((vHitX - x), 2) + Math.pow((vHitY - y), 2));
    // distance from x || y  side to another x || y side
    var deltaDistX = Math.sqrt(Math.pow(stepX, 2) + Math.pow(hdY, 2));
    var deltaDistY = Math.sqrt(Math.pow(vdX, 2) + Math.pow(stepY, 2));
    var side = (sideDistX < sideDistY) ? 0 : 1; // NS or WE wall hit ?
    var dist = (sideDistX < sideDistY) ? sideDistX : sideDistY; // initial distance from caster to intersection
    var i = 0; // number of intersections
    // @todo send hitX and hitY to test function
    while (intersection(row, column, dist, i)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            hHitX += stepX;
            hHitY += hdY;
            // vars passed to testfunction
            column += stepX;
            dist = sideDistX;
            side = 0;
        }
        else {
            sideDistY += deltaDistY;
            vHitX += vdX;
            vHitY += stepY;
            // vars passed to testfunction
            row += stepY;
            dist = sideDistY;
            side = 1;
        }
        i++;
    }
    return {
        // ray distance from caster
        dist: (!side)
            ? (sideDistX - deltaDistX)
            : (sideDistY - deltaDistY),
        // side, which was hit. NS or WE
        side: side,
        // ray x hit
        x: (side)
            ? (vHitX - vdX)
            : (hHitX - stepX),
        // ray y hit
        y: (side)
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
 * @param {Array<Array<number>>} map - 2d world on which will be casted ray
 * @param {number} x - camera coordinate in map
 * @param {number} y - camera coordinate in map
 * @param {testintersection} intersection - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @param {IRayConf} config - additional configuration
 * @return {Array<IRay>} all rays casted from position, check IRay type
 */
exports.castRays = function (map, x, y, rot, intersection, config) {
    if (config === void 0) { config = defaultConfig; }
    var castRayFromPosition = function (rayRot) { return exports.castRay(map, x, y, intersection, Utils_1.normalizeAngle(rayRot)); };
    var dRot = (Math.PI / (Math.PI / config.fov)) / config.count; // difference between each ray rot
    var center = (config.center) // start casting ray from center of FOV ?
        ? (rot - dRot * (config.count / 2) + (dRot / 2))
        : rot;
    var rays = []; // casted rays
    var i = 0;
    if (config.fisheye) {
        while (i < config.count) {
            // it's important to normalize rot before casting it, to make sure that rot will continue in direction
            rays.push(castRayFromPosition(i * dRot + center));
            i++;
        }
    }
    else {
        while (i < config.count) {
            // it's important to normalize rot before casting it, to make sure that rot will continue in direction
            // also remove fisheye effect
            rays.push(Utils_1.removeFisheye(castRayFromPosition(i * dRot + center), rot));
            i++;
        }
    }
    return rays;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    castRay: exports.castRay,
    castRays: exports.castRays
};
