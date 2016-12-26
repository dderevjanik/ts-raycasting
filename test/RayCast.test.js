const assert = require('assert');
const rayCast = require('./../dist/RayCast');
const enums = require('./../dist/Enums');
const testmaps = require('./testmaps');
const helper = require('./helper');

describe('castRay()', () => {

    describe('on blank map 4x4', () => {

        it('should cast a ray from position [1, 1] to south', () => {
            const castedRay = rayCast.castRay(testmaps.map4x4, 1, 1, helper.testUntilHit, enums.EDirection.SOUTH);
            assert.equal(castedRay.x, 1);
            assert.equal(castedRay.y, 2);
            assert.equal(castedRay.row, 2);
            assert.equal(castedRay.column, 0);
        });

        it('should cast a ray from position [2, 2] to east', () => {
            const castedRay = rayCast.castRay(testmaps.map4x4, 2, 2, helper.testUntilHit, enums.EDirection.EAST);
            assert.equal(castedRay.x, 2);
            assert.equal(castedRay.y, 2);
            assert.equal(castedRay.row, 1);
            assert.equal(castedRay.column, 3);
        });

        it('should cast a ray from position [2, 2] to north', () => {
            const castedRay = rayCast.castRay(testmaps.map4x4, 2, 2, helper.testUntilHit, enums.EDirection.NORTH);
            assert.equal(Math.ceil(castedRay.x), 2);
            assert.equal(castedRay.y, 1);
            assert.equal(castedRay.row, 0);
            assert.equal(castedRay.column, 1);
        });

        it('shoudl cast a ray from position [2, 2] to west', () => {
            const castedRay = rayCast.castRay(testmaps.map4x4, 2, 2, helper.testUntilHit, enums.EDirection.WEST);
            assert.equal(castedRay.x, 2);
            assert.equal(castedRay.y, 2);
            assert.equal(castedRay.row, 3);
            assert.equal(castedRay.column, 2);
        });

    });

});
