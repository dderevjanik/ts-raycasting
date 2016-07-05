import IQuadrant = require('./interfaces/IQuadrant');
import IRay = require('./interfaces/IRay');
declare var _default: {
    getQuadrant: (rot: number) => IQuadrant;
    normalizeAngle: (rot: number) => number;
    removeFisheye: (ray: IRay, camRot: number) => IRay;
};
export = _default;
