import { IRay } from './Interfaces';
/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant}
 */
export declare const getQuadrant: (rot: number) => number;
/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - rot to normalize, in radians
 * @return {number} normalized rot
 */
export declare const normalizeAngle: (rot: number) => number;
/**
 * Remove fisheye effect
 * @param {IRay} ray - ray to fix
 * @param {number} camRot - camera rot
 * @return {IRay} fixed ray
 */
export declare const removeFisheye: (ray: IRay, camRot: number) => IRay;
