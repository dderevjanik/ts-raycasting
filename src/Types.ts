/**
 * Test ray intersection with world's grid
 * @desc Here you should put code to check if ray hits a wall or not. If ray hits a wall, return 'false' to stop casting a ray further.
 * @param {number} row - ray intersection with world's row
 * @param {number} column - ray intersection with world's column
 * @param {number} cell - cell value, extracted from world[row][column]
 * @param {number} dist - distance from camera to current intersection, fisheye effect included
 * @param {number} index - number of current ray's intersections with world's grid
 * @return {boolean} true to stop casting a ray further in a world
 */
export type testIntersection = (row: number, column: number, cell: number, dist: number, index: number) => boolean;

export type trigLookupTable = {
    cos: Uint32Array,
    sin: Uint32Array,
    tan: Uint32Array,
    ctan: Uint32Array
};
