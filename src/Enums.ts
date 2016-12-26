export const enum ESide {
    NS = 0, // North-South
    WE = 1  // West-East
};

export const enum ERayTest {
    CONTINUE = 0,
    SKIP_RAY = 1,
    STOP_CASTING = 2
};

export const enum EQuadrant {
    TOP = 1 << 0,
    RIGTH = 1 << 1,
    BOTTOM = 1 << 2,
    LEFT = 1 << 3
};

export enum EDirection {
    NORTH = (Math.PI * 1.5),
    NORTHEAST = (Math.PI * 1.75),
    EAST = (Math.PI * 2),
    SOUTHEAST = (Math.PI * 2.25),
    SOUTH = (Math.PI * 0.5),
    SOUTHWEST = (Math.PI * 0.75),
    WEST = Math.PI,
    NOTHWEST = (Math.PI * 1.25)
};
