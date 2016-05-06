declare module "Interfaces/IPoint" {
    export interface IPoint {
        x: number;
        y: number;
    }
    export default IPoint;
}
declare module "Interfaces/IQuadrant" {
    export interface IQuadrant {
        top: boolean;
        right: boolean;
    }
    export default IQuadrant;
}
declare module "Interfaces/IRay" {
    import IPoint from "Interfaces/IPoint";
    export interface IRay extends IPoint {
        dist: number;
        side: number;
        row: number;
        column: number;
    }
    export default IRay;
}
declare module "Interfaces/all" {
    export * from "Interfaces/IPoint";
    export * from "Interfaces/IQuadrant";
    export * from "Interfaces/IRay";
}
declare module "Utils" {
    import { IQuadrant } from "Interfaces/all";
    /**
     * From which quadrant are we looking out ?
     * @param {number} rot - rot to be normalized
     * @return {IQuadrant}
     */
    export const getQuadrant: (rot: number) => IQuadrant;
    /**
     * Normalize angle to be between <0, 2*Math.Pi>
     * @param {number} rot
     * @retunr {number} normalized rot
     */
    export const normalizeAngle: (rot: number) => number;
    declare var _default: {
        getQuadrant: (rot: number) => IQuadrant;
        normalizeAngle: (rot: number) => number;
    };
    export default _default;
}
declare module "RayCast" {
    import { IRay } from "Interfaces/all";
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
    export const castRay: (map: number[][], rot: number, x: number, y: number, test: (row: number, column: number, index: number) => boolean, rayRot: number) => IRay;
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
    export const castRays: (map: number[][], x: number, y: number, rot: number, fov: number, count: number, test: (row: number, column: number, index: number) => boolean) => IRay[];
    declare var _default: {
        castRay: (map: number[][], rot: number, x: number, y: number, test: (row: number, column: number, index: number) => boolean, rayRot: number) => IRay;
        castRays: (map: number[][], x: number, y: number, rot: number, fov: number, count: number, test: (row: number, column: number, index: number) => boolean) => IRay[];
    };
    export default _default;
}
