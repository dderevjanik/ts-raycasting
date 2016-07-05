import IRay = require('./interfaces/IRay');
import IRayConf = require('./interfaces/IRayConf');
declare var _default: {
    castRay: (map: number[][], x: number, y: number, intersection: (row: number, column: number, dist: number, index: number) => boolean, rayRot: number) => IRay;
    castRays: (map: number[][], x: number, y: number, rot: number, intersection: (row: number, column: number, dist: number, index: number) => boolean, config?: IRayConf) => IRay[];
};
export = _default;
