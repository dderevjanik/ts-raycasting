import { getQuadrant, normalizeAngle, removeFisheye } from '../src/Utils';

describe('Utils', () => {

    describe('getQuadrant()', () => {

        it('should get bottom-left quadrant from 3.24', () => {
            const quadrant = getQuadrant(1.63);
            expect(quadrant).toEqual(12);
            expect(quadrant & (1 << 2)).toBe(4);
            expect(quadrant & (1 << 3)).toBe(8);
        });

        it('should get top-right quadrant from 5.12', () => {
            const quadrant = getQuadrant(5.12);
            expect(quadrant).toEqual(3);
            expect(quadrant & (1 << 0)).toBe(1);
            expect(quadrant & (1 << 1)).toBe(2);
        });

        it('should get right-bottom quadrant from 0', () => {
            const quadrant = getQuadrant(0);
            expect(quadrant).toEqual(6);
            expect(quadrant & (1 << 1)).toBe(2);
            expect(quadrant & (1 << 2)).toBe(4);
        });
    });

    describe('normalizeAngle()', () => {

        it('should normalize angle 0 -> 0.00', () => {
            const normalized = normalizeAngle(0);
            expect(normalized.toFixed(2)).toEqual("0.00");
        });

        it('should normalize angle 7.12 -> 1.15', () => {
            const normalized = normalizeAngle(7.43);
            expect(normalized.toFixed(2)).toEqual("1.15");

        });

        it('should normalize angle 19.98 -> 1.15', () => {
            const normalized = normalizeAngle(19.98);
            expect(normalized.toFixed(2)).toEqual("1.13");

        });

        it('should normalize angle -12.3 -> 6.02', () => {
            const normalized = normalizeAngle(12.3);
            expect(normalized.toFixed(2)).toEqual("6.02");

        });

    });

});
