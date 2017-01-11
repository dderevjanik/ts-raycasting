import { IRayConf } from './interfaces';

/**
 * This is default config used in castRays()
 */
export const defaultConfig: IRayConf = {
    rayCount: 256,
    fov: (Math.PI/2),
    fisheye: false,
    center: true
};
