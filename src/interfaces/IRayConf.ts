interface IRayConf {
    fov: number;        // field of view, Angle
    rayCount: number;      // number of rays to cast
    fisheye: boolean;   // fisheye effect ?
    center: boolean;    // casting rays from center ?
};

export = IRayConf;
