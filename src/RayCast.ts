import {IRay, IQuadrant} from './Interfaces/all';
import {normalizeAngle, getQuadrant} from './Utils';

export type testfunction = (row: number, column: number, index: number) => boolean;

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
export const castRay = (map: Array<Array<number>>, rot: number, x: number, y: number, test: testfunction, rayRot: number): IRay => {
    const rayAngle: number = normalizeAngle(rayRot);    // angle should be between <0, 2 * Math.PI>
    const angleSin: number = Math.sin(rayAngle);
    const angleCos: number = Math.cos(rayAngle);
    const quadrant: IQuadrant = getQuadrant(rayRot);    // in which quadrant is ray looking

    // current cell position in map
    let column: number = Math.floor(x);
    let row: number = Math.floor(y);

    const hSlope: number = (angleSin / angleCos);
    const vSlope: number = (angleCos / angleSin);

    const stepX: number = (quadrant.right) ? 1 : -1;
    const hdY: number = stepX * hSlope;

    const stepY: number = (quadrant.top) ? -1 : 1;
    const vdX: number = stepY * vSlope;

    // horizontal hit
    let hHitX: number = (quadrant.right) ? Math.ceil(x) : column;
    let hHitY: number = y + ((hHitX - x) * hSlope);

    // vertical hit
    let vHitY: number = (quadrant.top) ? row : Math.ceil(y);
    let vHitX: number = x + ((vHitY - y) * vSlope);

    // distance from current point to nearest x || y side
    let sideDistX: number = Math.sqrt((hHitX - x)**2 + (hHitY - y)**2);
    let sideDistY: number = Math.sqrt((vHitX - x)**2 + (vHitY - y)**2);

    // distance from x || y  side to another x || y side
    const deltaDistX: number = Math.sqrt(stepX**2 + hdY**2);
    const deltaDistY: number = Math.sqrt(vdX**2 + stepY**2);

    let side: number; // NS or ES wall hit ?
    let i: number = 0;
    while(test(row, column, i)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            hHitX += stepX;
            hHitY += hdY;
            column += stepX;
            side = 0;
        } else {
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
            // removing fisheye effect
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
export const castRays = (map: Array<Array<number>>, x: number, y: number, rot: number, fov: number, count: number, test: testfunction): Array<IRay> => {
    const castRayFromPosition: (rayRot: number) => IRay
        = castRay.bind(this, map, rot, x, y, test);
    const dRot: number = (Math.PI / (180 / fov)) / count;
    const rays: Array<IRay> = [];

    let i: number = 0;
    while(i < count) {
        rays.push(castRayFromPosition(i * dRot));
        i++;
    }
    return rays;
};

export default {
    castRay: castRay,
    castRays: castRays
};
