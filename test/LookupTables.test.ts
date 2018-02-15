import * as LookupTable from '../src/LookupTables';

describe('LookupTables', () => {

    describe('createSinTable()', () => {

        it('should generate Sin lookup table, 3 segments', () => {
            const table = LookupTable.createSinTable(3);
        });

    });

    describe('createCosTable()', () => {

        it('should generate Cos lookup table, 3 segments', () => {
            const table = LookupTable.createCosTable(3);
        });

    });

    describe('createTanTable()', () => {

        it('should generate Tan lookup table, 3 segments', () => {
            const table = LookupTable.createTanTable(3);
        });

    });

    describe('createCTanTable()', () => {

        it('should generate CTan lookup table, 3 segments', () => {
            const table = LookupTable.createCTanTable(3);
        });

    });

});
