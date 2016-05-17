import { IRay, IRayConf } from './Interfaces';
/**
 * Test ray intersection
 * Here you should put code to check if ray hit a wall or not. If ray hits wall, return false.
 * @param {number} row - ray intersection with row
 * @param {number} column - ray intersection with column
 * @param {number} dist - distance from caster to current intersection
 * @param {number} index - current index of intersection
 * @return {boolean} true to stop casting a ray further
 */
export declare type testintersection = (row: number, column: number, dist: number, index: number) => boolean;
/**
 * Cast one ray from position until test fails
 * @param {Array<Array<number>>} map - 2d world on which will be casted ray
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {testintersection} intersection - test function is called on every intersection. If fails, fuction will return IRay
 * @param {number} rayRot - rot of ray in radians
 * @return {IRay} information about ray, check IRay type
 */
export declare const castRay: (map: number[][], x: number, y: number, intersection: (row: number, column: number, dist: number, index: number) => boolean, rayRot: number) => IRay;
/**
 * Cast rays from position in world
 * @param {Array<Array<number>>} map - 2d world on which will be casted ray
 * @param {number} x - camera coordinate in map
 * @param {number} y - camera coordinate in map
 * @param {testintersection} intersection - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @param {IRayConf} config - additional configuration
 * @return {Array<IRay>} all rays casted from position, check IRay type
 */
export declare const castRays: (map: number[][], x: number, y: number, rot: number, intersection: (row: number, column: number, dist: number, index: number) => boolean, config?: IRayConf) => IRay[];
declare var _default: {
    castRay: (map: number[][], x: number, y: number, intersection: (row: number, column: number, dist: number, index: number) => boolean, rayRot: number) => IRay;
    castRays: (map: number[][], x: number, y: number, rot: number, intersection: (row: number, column: number, dist: number, index: number) => boolean, config?: IRayConf) => IRay[];
};
export default _default;
