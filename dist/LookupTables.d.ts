import { trigLookupTable } from './Types';
/**
 * Create lookup table
 * @desc lookup table helps runtime performance
 * @param {number} size - of lookup table
 * @param {function} fn - call this function on every iteration
 * @return {Uint32Array} - created lookup table filled with fn(x)
 */
export declare const createLookupTable: (size: number, fn: (x: number) => number) => Float32Array;
/**
 * Create function that will take 'rot' in units
 * @param {number} size - number of rots available, circle will be divided by this
 * @param {function} fn
 * @return {function}
 */
export declare const createRotFun: (size: number, fn: (rot: number) => number) => (rot: number) => number;
/**
 * Create Math.Sin filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export declare const createSinTable: (size: number) => Uint32Array;
/**
 * Create Math.Cos filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export declare const createCosTable: (size: number) => Uint32Array;
/**
 * Create Math.Tan filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export declare const createTanTable: (size: number) => Uint32Array;
/**
 * Create CTan filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export declare const createCTanTable: (size: number) => Uint32Array;
/**
 * Create trigonometry filled lookup tables
 * @param {number} size - of lookup tables
 * @return {trigLookupTable} object with all basics trigonometry functions lookup tables
 */
export declare const createTrigTables: (size: number) => trigLookupTable;
