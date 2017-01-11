import { trigLookupTable } from './Types';

/**
 * Create lookup table
 * @desc lookup table helps runtime performance
 * @param {number} size - of lookup table
 * @param {function} fn - call this function on every iteration
 * @return {Uint32Array} - created lookup table filled with fn(x)
 */
export const createLookupTable = (size: number, fn: (x: number) => number): Uint32Array => {
    const table = new Uint32Array(size);
    let i = 0;
    while(i < size) {
        table[i] = fn(i);
        i++;
    }
    return table;
};

/**
 * Create Math.Sin filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export const createSinTable = (size: number): Uint32Array => createLookupTable(size, Math.sin);

/**
 * Create Math.Cos filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export const createCosTable = (size: number): Uint32Array => createLookupTable(size, Math.cos);

/**
 * Create Math.Tan filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export const createTanTable = (size: number): Uint32Array => createLookupTable(size, Math.tan);

/**
 * Create CTan filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export const createCTanTable = (size: number): Uint32Array => createLookupTable(size, (x: number) => (Math.cos(x) / Math.sin(x)));

/**
 * Create trigonometry filled lookup tables
 * @param {number} size - of lookup tables
 * @return {trigLookupTable} object with all basics trigonometry functions lookup tables
 */
export const createTrigTables = (size: number): trigLookupTable => ({
    sin: createSinTable(size),
    cos: createCosTable(size),
    tan: createTanTable(size),
    ctan: createCTanTable(size)
});
