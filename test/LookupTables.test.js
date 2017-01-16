const assert = require('assert');
const lookuptables = require('./../dist/LookupTables');

describe('LookupTables', () => {

    describe('createSinTable()', () => {

        it('should generate Sin lookup table, 3 segments', () => {
            const table = lookuptables.createSinTable(3);
            console.log(table);
        });

    });

    describe('createCosTable()', () => {

        it('should generate Cos lookup table, 3 segments', () => {
            const table = lookuptables.createCosTable(3);
        });

    });

    describe('createTanTable()', () => {

        it('should generate Tan lookup table, 3 segments', () => {
            const table = lookuptables.createTanTable(3);
        });

    });

    describe('createCTanTable()', () => {

        it('should generate CTan lookup table, 3 segments', () => {
            const table = lookuptables.createCTanTable(3);
        });

    });

});
