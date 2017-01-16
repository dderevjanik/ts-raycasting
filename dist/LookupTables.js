/**
 * Create lookup table
 * @desc lookup table helps runtime performance
 * @param {number} size - of lookup table
 * @param {function} fn - call this function on every iteration
 * @return {Uint32Array} - created lookup table filled with fn(x)
 */
exports.createLookupTable = function (size, fn) {
    var table = new Float32Array(size);
    var i = 0;
    while (i < size) {
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
exports.createRotFun = function (size, fn) {
    var increment = ((Math.PI * 2) / size);
    return function (rot) { return fn(rot * increment); };
};
/**
 * Create Math.Sin filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
exports.createSinTable = function (size) { return exports.createLookupTable(size, exports.createRotFun(size, Math.sin)); };
/**
 * Create Math.Cos filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
exports.createCosTable = function (size) { return exports.createLookupTable(size, exports.createRotFun(size, Math.cos)); };
/**
 * Create Math.Tan filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
exports.createTanTable = function (size) { return exports.createLookupTable(size, exports.createRotFun(size, Math.tan)); };
/**
 * Create CTan filled lookup table
 * @param {number} size - of lookup table
 * @return {Uint32Array} - created lookup table
 */
exports.createCTanTable = function (size) { return exports.createLookupTable(size, function (x) { return (Math.cos(x * (2 * Math.PI) / size) / Math.sin(x * (2 * Math.PI) / size)); }); };
/**
 * Create trigonometry filled lookup tables
 * @param {number} size - of lookup tables
 * @return {trigLookupTable} object with all basics trigonometry functions lookup tables
 */
exports.createTrigTables = function (size) { return ({
    sin: exports.createSinTable(size),
    cos: exports.createCosTable(size),
    tan: exports.createTanTable(size),
    ctan: exports.createCTanTable(size)
}); };
