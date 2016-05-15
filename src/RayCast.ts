import {IRay, IQuadrant} from './Interfaces.ts';
import {normalizeAngle, getQuadrant} from './Utils.ts';

/**
 * Test ray intersection
 * Here you should put code to check if ray hit a wall or not. If ray hits wall, return false.
 * @param {number} row - ray intersection with row
 * @param {number} column - ray intersection with column
 * @param {number} dist - distance from caster to current intersection
 * @param {number} index - current index of intersection
 * @return {boolean} true to stop casting a ray further
 */
export type testintersection = (row: number, column: number, dist: number, index: number) => boolean;

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
export const castRay = (map: Array<Array<number>>, rot: number, x: number, y: number, intersection: testintersection, rayRot: number): IRay => {
    const angleSin: number = Math.sin(rayRot);
    const angleCos: number = Math.cos(rayRot);
    const quadrant: IQuadrant = getQuadrant(rayRot); // in which quadrant is ray looking to

    // current cell position in map
    let column: number = Math.floor(x);
    let row: number = Math.floor(y);

    const hSlope: number = (angleSin / angleCos); // tan
    const vSlope: number = (angleCos / angleSin); // ctan

    // horizontal intersection with cell
    const stepX: number = (quadrant.right) ? 1 : -1;
    const hdY: number = stepX * hSlope;

    // vertical intersection with cell
    const stepY: number = (quadrant.top) ? -1 : 1;
    const vdX: number = stepY * vSlope;

    // first horizontal intesection world coordinates in world
    let hHitX: number = (quadrant.right) ? Math.ceil(x) : column;
    let hHitY: number = y + ((hHitX - x) * hSlope);

    // first vertical intersection world coordinates in world
    let vHitY: number = (quadrant.top) ? row : Math.ceil(y);
    let vHitX: number = x + ((vHitY - y) * vSlope);

    // distance from current point to nearest x || y side
    let sideDistX: number = Math.sqrt((hHitX - x)**2 + (hHitY - y)**2);
    let sideDistY: number = Math.sqrt((vHitX - x)**2 + (vHitY - y)**2);

    // distance from x || y  side to another x || y side
    const deltaDistX: number = Math.sqrt(stepX**2 + hdY**2);
    const deltaDistY: number = Math.sqrt(vdX**2 + stepY**2);

    let side: number = (sideDistX < sideDistY) ? 0 : 1; // NS or EW wall hit ?
    let dist: number = (sideDistX < sideDistY) ? sideDistX : sideDistY; // initial distance from caster to intersection
    let i: number = 0; // number of intersections
    // @todo send hitX and hitY to test function
    while(intersection(row, column, dist, i)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            hHitX += stepX;
            hHitY += hdY;
            // vars passed to testfunction
            column += stepX;
            dist = sideDistX;
            side = 0;
        } else {
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
            // removing fisheye effect, @todo it should be optional
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
export const castRays = (map: Array<Array<number>>, x: number, y: number, rot: number, fov: number, count: number, intersection: testintersection): Array<IRay> => {
    const nRot: number = normalizeAngle(rot); // normalize rot to be between <0, Math.PI * 2>
    const castRayFromPosition: (rayRot: number) => IRay
        = castRay.bind(this, map, nRot, x, y, intersection);
    const dRot: number = (Math.PI / (180 / fov)) / count; // difference between each ray rot
    const center: number = rot - dRot * (count / 2) + (dRot / 2);

    const rays: Array<IRay> = []; // casted rays
    let i: number = 0;
    while(i < count) {
        // it's important to normalize rot before casting it, to make sure that rot will continue in direction
        rays.push(castRayFromPosition(normalizeAngle(i * dRot + center)));
        i++;
    }
    return rays;
};

export default {
    castRay: castRay,
    castRays: castRays
};
