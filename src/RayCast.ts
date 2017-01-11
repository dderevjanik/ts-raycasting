import { IRay, IRayConf } from './Interfaces';
import { ESide, EQuadrant } from './Enums';
import { getQuadrant, removeFisheye, normalizeAngle } from './Utils';
import { defaultConfig } from './Config';
import { testIntersection } from './Types';

/**
 * Cast one ray from position until test fails
 * @param {number[][]} world - 2d world on which will be casted ray
 * @param {number} x - camera's X coordinate in world
 * @param {number} y - camera's Y coordinate in world
 * @param {testintersection} intersection - test function is called on every ray's intersection with world's grid. If fails, fuction will return IRay
 * @param {number} rayRot - camera's rot in radians
 * @return {IRay} information about ray, check IRay type
 */
export const castRay = (world: number[][], x: number, y: number, intersection: testIntersection, rayRot: number): IRay => {
    const angleSin = Math.sin(rayRot);
    const angleCos = Math.cos(rayRot);
    const quadrant = getQuadrant(rayRot); // in which quadrant is ray looking to

    // current cell position in world
    let column = Math.floor(x);
    let row = Math.floor(y);

    const hSlope = (angleSin / angleCos); // tan
    const vSlope = (angleCos / angleSin); // ctan

    // NS intersection with cell
    const verticalStepX = (quadrant & EQuadrant.RIGTH) ? 1 : -1;
    const verticalStepY = (verticalStepX * hSlope);

    // WE intersection with cell
    const horizontalStepY = (quadrant & EQuadrant.TOP) ? -1 : 1;
    const horizontalStepX = (horizontalStepY * vSlope);

    // intersection with first horizontal line, WE
    let horizontalX = (quadrant & EQuadrant.RIGTH) ? Math.ceil(x) : column;
    let horizontalY = y + ((horizontalX - x) * hSlope);

    // intersection with first vertical line, NS
    let verticalY = (quadrant & EQuadrant.TOP) ? row : Math.ceil(y);
    let verticalX = x + ((verticalY - y) * vSlope);

    // distance from current point to nearest x || y side
    let sideDistX = Math.sqrt((horizontalX - x)**2 + (horizontalY - y)**2);
    let sideDistY = Math.sqrt((verticalX - x)**2 + (verticalY - y)**2);

    // distance from x || y  side to another x || y side
    const deltaDistX = Math.sqrt(verticalStepX**2 + verticalStepY**2);
    const deltaDistY = Math.sqrt(horizontalStepX**2 + horizontalStepY**2);

    let side = (sideDistX < sideDistY) ? ESide.NS : ESide.WE; // NS or WE wall hit ?
    let dist = (sideDistX < sideDistY) ? sideDistX : sideDistY; // initial distance from caster to intersection
    let i = 0; // number of intersections

    // @todo send hitX and hitY to test function
    while(intersection(row, column, world[row][column], dist, i)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            horizontalX += verticalStepX;
            horizontalY += verticalStepY;
            // arguments passed to testFunction
            column += verticalStepX;
            dist = sideDistX;
            side = ESide.NS;
        } else {
            sideDistY += deltaDistY;
            verticalX += horizontalStepX;
            verticalY += horizontalStepY;
            // arguments passed to testFunction
            row += horizontalStepY;
            dist = sideDistY;
            side = ESide.WE;
        }
        i++;
    }

    return {
        // ray distance from caster
        dist: (side === ESide.NS)
            ? (sideDistX - deltaDistX)
            : (sideDistY - deltaDistY),
        // side, which was hit. NS or WE
        side: side,
        // ray's real X hit position in world
        x: (side === ESide.WE)
            ? (verticalX - horizontalStepX)
            : (horizontalX - verticalStepX),
        // ray's real Y hit position in world
        y: (side === ESide.WE)
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
export const castRays = (world: number[][], x: number, y: number, rot: number, intersection: testIntersection, config: IRayConf = defaultConfig): IRay[] => {
    const castRayFromCurrentPosition = (rayRot: number): IRay => castRay(world, x, y, intersection, normalizeAngle(rayRot));
    const castRayPipe = (config.fisheye)
        ? castRayFromCurrentPosition
        : (rayRot: number) => removeFisheye(castRayFromCurrentPosition(rayRot), rot);

    const center = config.center  // start casting rays from center of FOV ?
        ? (rot - (config.fov/2))
        : (rot - (config.fov/2));
    const dRot = (config.fov / config.rayCount); // difference between each ray's rot
    const rays: IRay[] = []; // casted rays

    let i = 0;
    while(i < config.rayCount) {
        rays.push(castRayPipe((i * dRot) + center));
        i++;
    }
    return rays;
};
