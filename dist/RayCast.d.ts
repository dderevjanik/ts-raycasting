import { IRay } from './Interfaces.ts';
/**
 * Test ray intersection
 * @param {number} row - ray intersection with row
 * @param {number} column - ray intersection with column
 * @param {number} index - current index of intersection
 */
export declare type testfunction = (row: number, column: number, index: number) => boolean;
/**
 * Cast one ray from position until test fails
 * @param {Array<Array<number>>} map - 2d map on which will be casted ray
 * @param {number} rot - current rot in radians
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {testfunction} test - test function is called on every intersection. If fails, fuction will return IRay
 * @param {number} rayRot - ray rot in radians
 * @return {IRay} information about ray, check type
 */
export declare const castRay: (map: number[][], rot: number, x: number, y: number, test: (row: number, column: number, index: number) => boolean, rayRot: number) => IRay;
/**
 * Cast rays from position
 * @param {Array<Array<number>>} map - 2d map on which will be casted ray
 * @param {number} x - camera coordinate in map
 * @param {number} y - camera coordinate in map
 * @param {number} rot - current rot of camera in radians
 * @param {number} fov - camera field of view
 * @param {number} count - number of rays to cast from camera
 * @param {testfunction} test - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @return {Array<IRay>} information about ray, check type
 */
export declare const castRays: (map: number[][], x: number, y: number, rot: number, fov: number, count: number, test: (row: number, column: number, index: number) => boolean) => IRay[];
declare var _default: {
    castRay: (map: number[][], rot: number, x: number, y: number, test: (row: number, column: number, index: number) => boolean, rayRot: number) => IRay;
    castRays: (map: number[][], x: number, y: number, rot: number, fov: number, count: number, test: (row: number, column: number, index: number) => boolean) => IRay[];
};
export default _default;
