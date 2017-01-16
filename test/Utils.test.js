const assert = require('assert');
const utils = require('./../dist/Utils');

describe('Utils', () => {

    describe('getQuadrant()', () => {

        it('should get bottom-left quadrant from 3.24', () => {
            const quadrant = utils.getQuadrant(1.63);
            assert.equal(quadrant, 12);
            assert(quadrant & (1 << 2));
            assert(quadrant & (1 << 3));
        });

        it('should get top-right quadrant from 5.12', () => {
            const quadrant = utils.getQuadrant(5.12);
            assert.equal(quadrant, 3);
            assert(quadrant & (1 << 0));
            assert(quadrant & (1 << 1));
        });

        it('should get right-bottom quadrant from 0', () => {
            const quadrant = utils.getQuadrant(0);
            assert.equal(quadrant, 6);
            assert(quadrant & (1 << 1));
            assert(quadrant & (1 << 2));
        });
    });

    describe('normalizeAngle()', () => {

        it('should normalize angle 0 -> 0.00', () => {
            const normalized = utils.normalizeAngle(0);
            assert.equal(normalized.toFixed(2), 0.00);
        });

        it('should normalize angle 7.12 -> 1.15', () => {
            const normalized = utils.normalizeAngle(7.43);
            assert.equal(normalized.toFixed(2), 1.15);
        });

        it('should normalize angle 19.98 -> 1.15', () => {
            const normalized = utils.normalizeAngle(19.98);
            assert.equal(normalized.toFixed(2), 1.13);
        });

        it('should normalize angle -12.3 -> 6.02', () => {
            const normalized = utils.normalizeAngle(12.3);
            assert.equal(normalized.toFixed(2), 6.02);
        });

    });

});
