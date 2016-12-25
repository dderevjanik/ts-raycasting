export const enum ESide {
    NS = 0, // North-South
    WE = 1  // West-East
};

export const enum ERayTest {
    CONTINUE = 0,
    SKIP_RAY = 1,
    STOP_CASTING = 2
};

export enum EDirection {
    NORTH = (Math.PI * 1.5),
    EAST = (Math.PI * 2),
    SOUTH = (Math.PI / 2),
    WEST = Math.PI
};
