"use strict";
var _this = this;
var Utils_1 = require('./Utils');
/**
 * Cast one ray from position until test fails
 * @param {Array<Array<number>>} map - 2d map on which will be casted ray
 * @param {number} rot - current rot
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {testfunction} test - thsi function is called on every intersection. If fail, fuction will return IRay
 * @param {number} rayRot - ray rot
 * @return {IRay} information about ray, check type
 */
exports.castRay = function (map, rot, x, y, test, rayRot) {
    var rayAngle = Utils_1.normalizeAngle(rayRot); // angle should be between <0, 2 * Math.PI>
    var angleSin = Math.sin(rayAngle);
    var angleCos = Math.cos(rayAngle);
    var quadrant = Utils_1.getQuadrant(rayRot); // in which quadrant is ray looking
    // current cell position in map
    var column = Math.floor(x);
    var row = Math.floor(y);
    var hSlope = (angleSin / angleCos);
    var vSlope = (angleCos / angleSin);
    var stepX = (quadrant.right) ? 1 : -1;
    var hdY = stepX * hSlope;
    var stepY = (quadrant.top) ? -1 : 1;
    var vdX = stepY * vSlope;
    // horizontal hit
    var hHitX = (quadrant.right) ? Math.ceil(x) : column;
    var hHitY = y + ((hHitX - x) * hSlope);
    // vertical hit
    var vHitY = (quadrant.top) ? row : Math.ceil(y);
    var vHitX = x + ((vHitY - y) * vSlope);
    // distance from current point to nearest x || y side
    var sideDistX = Math.sqrt(Math.pow((hHitX - x), 2) + Math.pow((hHitY - y), 2));
    var sideDistY = Math.sqrt(Math.pow((vHitX - x), 2) + Math.pow((vHitY - y), 2));
    // distance from x || y  side to another x || y side
    var deltaDistX = Math.sqrt(Math.pow(stepX, 2) + Math.pow(hdY, 2));
    var deltaDistY = Math.sqrt(Math.pow(vdX, 2) + Math.pow(stepY, 2));
    var side; // NS or ES wall hit ?
    var i = 0;
    while (test(row, column, i)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            hHitX += stepX;
            hHitY += hdY;
            column += stepX;
            side = 0;
        }
        else {
            sideDistY += deltaDistY;
            vHitX += vdX;
            vHitY += stepY;
            row += stepY;
            side = 1;
        }
        i += 1;
    }
    return {
        dist: (!side)
            ? (sideDistX - deltaDistX) * Math.cos(rot - rayAngle)
            : (sideDistY - deltaDistY) * Math.cos(rot - rayAngle),
        side: side,
        x: (side)
            ? (vHitX - vdX)
            : (hHitX - stepX),
        y: (side)
            ? (vHitY - stepY)
            : (hHitY - hdY),
        row: row,
        column: column
    };
};
/**
 * Cast rays from position
 * @param {Array<Array<number>>} map - 2d map on which will be casted ray
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {number} rot - current rot
 * @param {number} fov - field of view
 * @param {number} count - number of rays to cast
 * @param {testfunction} test - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @return {Array<IRay>} information about ray, check type
 */
exports.castRays = function (map, x, y, rot, fov, count, test) {
    var castRayFromPosition = exports.castRay.bind(_this, map, rot, x, y, test);
    var dRot = (Math.PI / (180 / fov)) / count;
    var rays = [];
    var i = 0;
    while (i < count) {
        rays.push(castRayFromPosition(i * dRot));
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