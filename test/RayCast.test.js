const assert = require('assert');
const rayCast = require('./../dist/RayCast');
const enums = require('./../dist/Enums');
const testmaps = require('./testmaps');

const MAX_INTERSECTIONS = 128;
const testUntilHit = (row, column, cell, dist, i) => {
    if (i > MAX_INTERSECTIONS) {
        return false;
    }
    if (cell === 1) {
        return false;
    }
    return true;
};

describe('castRay()', () => {

    describe('on blank map 4x4', () => {

        it('should cast a ray from position [1, 1] to south', () => {
            const castedRay = rayCast.castRay(testmaps.map4x4, 1, 1, testUntilHit, enums.EDirection.SOUTH);
            assert.equal(castedRay.x, 1);
            assert.equal(castedRay.y, 2);
            assert.equal(castedRay.row, 2);
            assert.equal(castedRay.column, 0);
        });

        it('should cast a ray from position [3, 2] to east', () => {
            const castedRay = rayCast.castRay(testmaps.map4x4, 1, 1, testUntilHit, enums.EDirection.EAST);
            assert.equal(castedRay.x, 1);
            assert.equal(castedRay.y, 1);
            assert.equal(castedRay.row, 0);
            assert.equal(castedRay.column, 1);
        });

        it('should cast a ray from position [2, 2] to north', () => {
            const castedRay = rayCast.castRay(testmaps.map4x4, 1, 1, testUntilHit, enums.EDirection.NORTH);
            assert.equal(castedRay.x, 1);
            assert.equal(castedRay.y, 1);
            assert.equal(castedRay.row, 0);
            assert.equal(castedRay.column, 1);
        });

        it('shoudl cast a ray from position [3, 3] to west', () => {
            const castedRay = rayCast.castRay(testmaps.map4x4, 1, 1, testUntilHit, enums.EDirection.WEST);
            assert.equal(castedRay.x, 1);
            assert.equal(castedRay.y, 1);
            assert.equal(castedRay.row, 2);
            assert.equal(castedRay.column, 0);
        });

    });

});
