import IPoint from './IPoint';

export interface IRay extends IPoint {
    dist: number;
    side: number;
    row: number;
    column: number;
};

export default IRay;
