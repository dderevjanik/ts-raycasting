import { IRay } from './Interfaces';
/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant} flags
 */
export declare const getQuadrant: (rot: number) => number;
/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - to normalize, in radians
 * @return {number} normalized rot
 */
export declare const normalizeAngle: (rot: number) => number;
/**
 * Remove fisheye effect from a ray
 * @desc ray's distance will be aligned with camera's rot
 * @param {IRay} ray - ray to fix
 * @param {number} camRot - camera's rot
 * @return {IRay} ray with fixed distance
 */
export declare const removeFisheye: (ray: IRay, camRot: number) => IRay;
