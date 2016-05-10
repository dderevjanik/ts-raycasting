import { IQuadrant } from './Interfaces.ts';
/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant}
 */
export declare const getQuadrant: (rot: number) => IQuadrant;
/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - rot to normalize, in radians
 * @return {number} normalized rot
 */
export declare const normalizeAngle: (rot: number) => number;
declare var _default: {
    getQuadrant: (rot: number) => IQuadrant;
    normalizeAngle: (rot: number) => number;
};
export default _default;
