import { castRay, castRays } from '../src/RayCast';
import * as Enum from '../src/Enums';

import { map4x4, map12x12 } from './helpers/testmaps';
import { testUntilHit } from './helpers/configs';

describe('RayCast', () => {

    describe('castRay()', () => {

        describe('on blank map 4x4', () => {

            it('should cast a ray from position [1, 1] to south', () => {
                const castedRay = castRay(map4x4, 1, 1, testUntilHit, Enum.EDirection.SOUTH);
                expect(castedRay.x).toEqual(1);
                expect(castedRay.y).toEqual(2);
                expect(castedRay.row).toEqual(2);
                expect(castedRay.column).toEqual(0);
            });

            it('should cast a ray from position [2, 2] to east', () => {
                const castedRay = castRay(map4x4, 2, 2, testUntilHit, Enum.EDirection.EAST);
                expect(castedRay.x).toEqual(2);
                expect(castedRay.y).toEqual(2);
                expect(castedRay.row).toEqual(1);
                expect(castedRay.column).toEqual(3);
            });

            it('should cast a ray from position [2, 2] to north', () => {
                const castedRay = castRay(map4x4, 2, 2, testUntilHit, Enum.EDirection.NORTH);
                expect(Math.ceil(castedRay.x)).toEqual(2);
                expect(castedRay.y).toEqual(1);
                expect(castedRay.row).toEqual(0);
                expect(castedRay.column).toEqual(1);
            });

            it('shoudl cast a ray from position [2, 2] to west', () => {
                const castedRay = castRay(map4x4, 2, 2, testUntilHit, Enum.EDirection.WEST);
                expect(castedRay.x).toEqual(2);
                expect(castedRay.y).toEqual(2);
                expect(castedRay.row).toEqual(3);
                expect(castedRay.column).toEqual(2);
            });

        });

        describe('on blank map 12x12', () => {

            it('should cast a ray from position [9, 1] to south', () => {
                const castedRay = castRay(map12x12, 9, 1, testUntilHit, Enum.EDirection.SOUTH);
                expect(castedRay.x).toEqual(9);
                expect(castedRay.y).toEqual(10);
                expect(castedRay.dist).toEqual(9);
                expect(castedRay.row).toEqual(11);
                expect(castedRay.column).toEqual(8);
            });

            it('should cast a ray from position [10, 8] to east', () => {
                const castedRay = castRay(map12x12, 10, 8, testUntilHit, Enum.EDirection.EAST);
                expect(castedRay.x).toEqual(10);
                expect(castedRay.y).toEqual(8);
                expect(castedRay.row).toEqual(7);
                expect(castedRay.column).toEqual(11);
            });

            it('should cast a ray from position [4, 3] to north', () => {
                const castedRay = castRay(map12x12, 4, 3, testUntilHit, Enum.EDirection.EAST);
                expect(castedRay.x).toEqual(10);
                expect(Math.ceil(castedRay.y)).toEqual(3);
                expect(castedRay.row).toEqual(2);
                expect(castedRay.column).toEqual(11);
            });

            it('should cast a ray from position [6, 7] to west', () => {
                const castedRay = castRay(map12x12, 6, 7, testUntilHit, Enum.EDirection.WEST);
                expect(castedRay.x).toEqual(1);
                expect(castedRay.y).toEqual(7);
                expect(castedRay.row).toEqual(8);
                expect(castedRay.column).toEqual(0);
            });
        });

    });

});
