"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var Config_1 = require("./Config");
/**
 * Cast one ray from position until test fails
 * @param {number[][]} world - 2d world on which will be casted ray
 * @param {number} x - camera's X coordinate in world
 * @param {number} y - camera's Y coordinate in world
 * @param {testintersection} intersection - test function is called on every ray's intersection with world's grid. If fails, fuction will return IRay
 * @param {number} rayRot - camera's rot in radians
 * @return {IRay} information about ray, check IRay type
 */
exports.castRay = function (world, x, y, intersection, rayRot) {
    var angleSin = Math.sin(rayRot);
    var angleCos = Math.cos(rayRot);
    var quadrant = Utils_1.getQuadrant(rayRot); // in which quadrant is ray looking to
    // current cell position in world
    var column = Math.floor(x);
    var row = Math.floor(y);
    var hSlope = (angleSin / angleCos); // tan
    var vSlope = (angleCos / angleSin); // ctan
    // NS intersection with cell
    var verticalStepX = (quadrant & 2 /* RIGTH */) ? 1 : -1;
    var verticalStepY = (verticalStepX * hSlope);
    // WE intersection with cell
    var horizontalStepY = (quadrant & 1 /* TOP */) ? -1 : 1;
    var horizontalStepX = (horizontalStepY * vSlope);
    // intersection with first horizontal line, WE
    var horizontalX = (quadrant & 2 /* RIGTH */) ? Math.ceil(x) : column;
    var horizontalY = y + ((horizontalX - x) * hSlope);
    // intersection with first vertical line, NS
    var verticalY = (quadrant & 1 /* TOP */) ? row : Math.ceil(y);
    var verticalX = x + ((verticalY - y) * vSlope);
    // distance from current point to nearest x || y side
    var sideDistX = Math.sqrt(Math.pow((horizontalX - x), 2) + Math.pow((horizontalY - y), 2));
    var sideDistY = Math.sqrt(Math.pow((verticalX - x), 2) + Math.pow((verticalY - y), 2));
    // distance from x || y  side to another x || y side
    var deltaDistX = Math.sqrt(Math.pow(verticalStepX, 2) + Math.pow(verticalStepY, 2));
    var deltaDistY = Math.sqrt(Math.pow(horizontalStepX, 2) + Math.pow(horizontalStepY, 2));
    var side = (sideDistX < sideDistY) ? 0 /* NS */ : 1 /* WE */; // NS or WE wall hit ?
    var dist = (sideDistX < sideDistY) ? sideDistX : sideDistY; // initial distance from caster to intersection
    var i = 0; // number of intersections
    // @todo send hitX and hitY to test function
    while (intersection(row, column, world[row][column], dist, i)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            horizontalX += verticalStepX;
            horizontalY += verticalStepY;
            // arguments passed to testFunction
            column += verticalStepX;
            dist = sideDistX;
            side = 0 /* NS */;
        }
        else {
            sideDistY += deltaDistY;
            verticalX += horizontalStepX;
            verticalY += horizontalStepY;
            // arguments passed to testFunction
            row += horizontalStepY;
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
        // ray's real X hit position in world
        x: (side === 1 /* WE */)
            ? (verticalX - horizontalStepX)
            : (horizontalX - verticalStepX),
        // ray's real Y hit position in world
        y: (side === 1 /* WE */)
            ? (verticalY - horizontalStepY)
            : (horizontalY - verticalStepY),
        // ray's rot
        rot: rayRot,
        // ray's row hit
        row: row,
        // ray's column hit
        column: column
    };
};
/**
 * Cast rays from position in world
 * @param {number[][]} world - 2d world on which will be casted ray
 * @param {number} x - camera X coordinate in world
 * @param {number} y - camera Y coordinate in world
 * @param {testintersection} intersection - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @param {IRayConf} config - additional configuration
 * @return {IRay[]} all rays casted from position, check IRay type
 */
exports.castRays = function (world, x, y, rot, intersection, config) {
    if (config === void 0) { config = Config_1.defaultConfig; }
    var castRayFromCurrentPosition = function (rayRot) { return exports.castRay(world, x, y, intersection, Utils_1.normalizeAngle(rayRot)); };
    var castRayPipe = (config.fisheye)
        ? castRayFromCurrentPosition
        : function (rayRot) { return Utils_1.removeFisheye(castRayFromCurrentPosition(rayRot), rot); };
    var center = config.center // start casting rays from center of FOV ?
        ? (rot - (config.fov / 2))
        : (rot - (config.fov / 2));
    var dRot = (config.fov / config.rayCount); // difference between each ray's rot
    var rays = []; // casted rays
    var i = 0;
    while (i < config.rayCount) {
        rays.push(castRayPipe((i * dRot) + center));
        i++;
    }
    return rays;
};
