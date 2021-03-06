import { trigLookupTable } from './Types';

/**
 * Create lookup table
 * @desc lookup table helps runtime performance
 * @param {number} size - of lookup table
 * @param {function} fn - call this function on every iteration
 * @return {Uint32Array} - created lookup table filled with fn(x)
 */
export const createLookupTable = (size: number, fn: (x: number) => number): Float32Array => {
    const table = new Float32Array(size);
    let i = 0;
    while(i < size) {
        table[i] = fn(i);
        i++;
    }
    return table;
};

/**
 * Create function that will take 'rot' in units
 * @param {number} size - number of rots available, circle will be divided by this
 * @param {function} fn
 * @return {function}
 */
export const createRotFun = (size: number, fn: (rot: number) => number): (rot: number) => number => {
    const increment = ((Math.PI*2) / size);
    return (rot: number) => fn(rot*increment);
};

/**
 * Create Math.Sin filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export const createSinTable = (size: number): Uint32Array => createLookupTable(size, createRotFun(size, Math.sin));

/**
 * Create Math.Cos filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export const createCosTable = (size: number): Uint32Array => createLookupTable(size, createRotFun(size, Math.cos));

/**
 * Create Math.Tan filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export const createTanTable = (size: number): Uint32Array => createLookupTable(size, createRotFun(size, Math.tan));

/**
 * Create CTan filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
export const createCTanTable = (size: number): Uint32Array => createLookupTable(size, (x: number) => (Math.cos(x*(2*Math.PI)/size) / Math.sin(x*(2*Math.PI)/size)));

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
