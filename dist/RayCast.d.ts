import { IRay, IRayConf } from './Interfaces';
export declare const defaultConfig: IRayConf;
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
export declare type testintersection = (row: number, column: number, cell: number, dist: number, index: number) => boolean;
/**
 * Cast one ray from position until test fails
 * @param {number[][]} map - 2d world on which will be casted ray
 * @param {number} x - coordinate in map
 * @param {number} y - coordinate in map
 * @param {testintersection} intersection - test function is called on every intersection. If fails, fuction will return IRay
 * @param {number} rayRot - camera's rot in radians
 * @return {IRay} information about ray, check IRay type
 */
export declare const castRay: (map: number[][], x: number, y: number, intersection: testintersection, rayRot: number) => IRay;
/**
 * Cast rays from position in world
 * @param {number[][]} map - 2d world on which will be casted ray
 * @param {number} x - camera coordinate in map
 * @param {number} y - camera coordinate in map
 * @param {testintersection} intersection - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @param {IRayConf} config - additional configuration
 * @return {IRay[]} all rays casted from position, check IRay type
 */
export declare const castRays: (map: number[][], x: number, y: number, rot: number, intersection: testintersection, config?: IRayConf) => IRay[];
