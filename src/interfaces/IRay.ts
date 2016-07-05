import IPoint = require('./IPoint');

interface IRay extends IPoint {
    dist: number;
    side: number;
    rot: number;
    row: number;
    column: number;
};

export = IRay;
