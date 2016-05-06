import { IQuadrant } from './Interfaces/all';
/**
 * From which quadrant are we looking out ?
 * @param {number} rot - rot to be normalized
 * @return {IQuadrant}
 */
export declare const getQuadrant: (rot: number) => IQuadrant;
/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot
 * @retunr {number} normalized rot
 */
export declare const normalizeAngle: (rot: number) => number;
declare var _default: {
    getQuadrant: (rot: number) => IQuadrant;
    normalizeAngle: (rot: number) => number;
};
export default _default;
