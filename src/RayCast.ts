import { IRay, IRayConf } from './Interfaces';
import { normalizeAngle, getQuadrant, removeFisheye } from './Utils';
import { ESide, EQuadrant } from './Enums';

// default castRays configuration
export const defaultConfig: IRayConf = {
    rayCount: 256,
    fov: (Math.PI/2),
    fisheye: false,
    center: true
};

/**
 * Test ray intersection
 * Here you should put code to check if ray hit a wall or not. If ray hits wall, return false.
 * @param {number} row - ray intersection with row
 * @param {number} column - ray intersection with column
 * @param {number} cell - cell value
 * @param {number} dist - distance from caster to current intersection
 * @param {number} index - current index of intersection
 * @return {boolean} true to stop casting a ray further
 */
export type testintersection = (row: number, column: number, cell: number, dist: number, index: number) => boolean;

/**
 * Cast one ray from position until test fails
 * @param {number[][]} map - 2d world on which will be casted ray
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {testintersection} intersection - test function is called on every intersection. If fails, fuction will return IRay
 * @param {number} rayRot - camera's rot in radians
 * @return {IRay} information about ray, check IRay type
 */
export const castRay = (map: number[][], x: number, y: number, intersection: testintersection, rayRot: number): IRay => {
    const angleSin = Math.sin(rayRot);
    const angleCos = Math.cos(rayRot);
    const quadrant = getQuadrant(rayRot); // in which quadrant is ray looking to

    // current cell position in map
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
    while(intersection(row, column, map[row][column], dist, i)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            horizontalX += verticalStepX;
            horizontalY += verticalStepY;
            // vars passed to testfunction
            column += verticalStepX;
            dist = sideDistX;
            side = ESide.NS;
        } else {
            sideDistY += deltaDistY;
            verticalX += horizontalStepX;
            verticalY += horizontalStepY;
            // vars passed to testfunction
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
        // ray x hit
        x: (side === ESide.WE)
            ? (verticalX - horizontalStepX)
            : (horizontalX - verticalStepX),
        // ray y hit
        y: (side === ESide.WE)
            ? (verticalY - horizontalStepY)
            : (horizontalY - verticalStepY),
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
export const castRays = (map: number[][], x: number, y: number, rot: number, intersection: testintersection, config: IRayConf = defaultConfig): IRay[] => {
    const castRayFromPosition = (rayRot: number): IRay => castRay(map, x, y, intersection, normalizeAngle(rayRot));
    const dRot = (config.fov / config.rayCount); // difference between each ray rot
    const center = config.center  // start casting ray from center of FOV ?
        ? (rot - (config.fov/2))
        : (rot - (config.fov/2));

    const rays: IRay[] = []; // casted rays
    let i = 0;
    if (config.fisheye) {
        while(i < config.rayCount) {
            // it's important to normalize rot before casting it, to make sure that rot will continue in direction
            rays.push(castRayFromPosition((i * dRot) + center));
            i++;
        }
    } else {
        while(i < config.rayCount) {
            // it's important to normalize rot before casting it, to make sure that rot will continue in direction
            // also remove fisheye effect
            rays.push(removeFisheye(castRayFromPosition((i * dRot) + center), rot));
            i++;
        }
    }
    return rays;
};
