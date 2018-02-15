export const MAX_INTERSECTIONS = 128;

export const testUntilHit = (row, column, cell, dist, i) => {
    if (i > MAX_INTERSECTIONS) {
        console.log('over');
        return false;
    }
    if (cell === 1) {
        return false;
    }
    return true;
};
