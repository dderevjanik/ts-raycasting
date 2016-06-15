export interface IRayConf {
    fov: number;        // field of view, Angle
    count: number;      // number of rays to cast
    fisheye: boolean;   // fisheye effect ?
    center: boolean;    // casting rays from center ?
};

export default IRayConf;
