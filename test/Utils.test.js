const assert = require('assert');
const utils = require('./../dist/Utils');

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
