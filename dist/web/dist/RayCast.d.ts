import { IRay, IRayConf } from './Interfaces';
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
export declare const castRay: (world: number[][], x: number, y: number, intersection: testIntersection, rayRot: number) => IRay;
/**
 * Cast rays from position in world
 * @param {number[][]} world - 2d world on which will be casted ray
 * @param {number} x - camera X coordinate in world
 * @param {number} y - camera Y coordinate in world
 * @param {testintersection} intersection - this function is called on every ray's intersection. If fail, fuction will return IRay
 * @param {IRayConf} config - additional configuration
 * @return {IRay[]} all rays casted from position, check IRay type
 */
export declare const castRays: (world: number[][], x: number, y: number, rot: number, intersection: testIntersection, config?: IRayConf) => IRay[];
