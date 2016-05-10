import {IQuadrant} from './Interfaces.ts';

const twoPI: number = Math.PI * 2;

/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant}
 */
export const getQuadrant = (rot: number): IQuadrant => ({
    top: ((rot < 0) || (rot > Math.PI)) ? true : false,
    right: ((rot > (twoPI * 0.75)) || (rot < (twoPI * 0.25))) ? true : false
});

/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - rot to normalize, in radians
 * @return {number} normalized rot
 */
export const normalizeAngle = (rot: number): number => {
    const rayAngle: number = rot % twoPI;
    return (rayAngle < 0)
        ? twoPI + rayAngle
        : rayAngle;
};

export default {
    getQuadrant: getQuadrant,
    normalizeAngle: normalizeAngle
};
