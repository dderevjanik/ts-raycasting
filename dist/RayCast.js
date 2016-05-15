"use strict";
var _this = this;
var Utils_ts_1 = require('./Utils.ts');
/**
 * Cast one ray from position until test fails
 * @param {Array<Array<number>>} map - 2d world on which will be casted ray
 * @param {number} rot - camera rot, in radians
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {testintersection} intersection - test function is called on every intersection. If fails, fuction will return IRay
 * @param {number} rayRot - rot of ray in radians
 * @return {IRay} information about ray, check IRay type
 */
exports.castRay = function (map, rot, x, y, intersection, rayRot) {
    var angleSin = Math.sin(rayRot);
    var angleCos = Math.cos(rayRot);
    var quadrant = Utils_ts_1.getQuadrant(rayRot); // in which quadrant is ray looking to
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
    var side = (sideDistX < sideDistY) ? 0 : 1; // NS or EW wall hit ?
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
            ? (sideDistX - deltaDistX) * Math.cos(rot - rayRot)
            : (sideDistY - deltaDistY) * Math.cos(rot - rayRot),
        // side, which was hit. NS or ES
        side: side,
        // ray x hit
        x: (side)
            ? (vHitX - vdX)
            : (hHitX - stepX),
        // ray y hit
        y: (side)
            ? (vHitY - stepY)
            : (hHitY - hdY),
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
 * @param {number} rot - camera rot, in radians
 * @param {number} fov - camera field of view, angle
 * @param {number} count - number of rays to cast from camera
 * @param {testintersection} intersection - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @return {Array<IRay>} all rays casted from position, check IRay type
 */
exports.castRays = function (map, x, y, rot, fov, count, intersection) {
    var nRot = Utils_ts_1.normalizeAngle(rot); // normalize rot to be between <0, Math.PI * 2>
    var castRayFromPosition = exports.castRay.bind(_this, map, nRot, x, y, intersection);
    var dRot = (Math.PI / (180 / fov)) / count; // difference between each ray rot
    var center = rot - dRot * (count / 2) + (dRot / 2);
    var rays = []; // casted rays
    var i = 0;
    while (i < count) {
        // it's important to normalize rot before casting it, to make sure that rot will continue in direction
        rays.push(castRayFromPosition(Utils_ts_1.normalizeAngle(i * dRot + center)));
        i++;
    }
    return rays;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    castRay: exports.castRay,
    castRays: exports.castRays
};
//# sourceMappingURL=RayCast.js.map