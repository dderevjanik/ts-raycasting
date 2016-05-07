# TS RayCasting

![Travis](https://travis-ci.org/dderevjanik/ts-raycasting.svg?branch=master)

Small raycast library

## Overview

### What is included

- [x] casting a custom number of rays from camera position with specific direction
- [x] normalizing angle (it'll be always between <0, Math.PI * 2>)
- [x] removing fisheye effect
- [x] checking every ray intersection
- [ ] customizing fisheye effect
- [ ] control over distance

### Functions

**castRay**

```ts
castRay(map: Array<Array<number>>, rot: number, x: number, y: number, test: testfunction, rayRot: number): IRay
```

Will cast ray from position in map. *rot* is point, from which will be ray casted and *rayRot* is direction of ray.

**castRays**

```ts
castRays(map: Array<Array<number>>, x: number, y: number, rot: number, fov: number, count: number, test: testfunction): Array<IRay>
```

Cast several rays, it'll also normalize angle and remove fisheye effect.

**testFunction**

```ts
type testFunction = (row: number, column: number, index: number) => boolean;
```

### Interfaces

**IRay**

```ts
import IRay from 'ts-raycasting/interfaces/IRay.d.ts
```

```ts
interface IRay {
    x: number;          // ray's x hit position in map
    y: number;          // ray's y hit position in map
    dist: number;       // distance from original position to hit position
    side: number;       // side of hit, 0 = NS, 1 = SE
    row: number;        // ray's row hit
    column: number;     // ray's column hit
};
```

## How to use

First, you need import a ts-raycasting library into your project

```ts
import tsrays from 'ts-raycasting';
```

and have 2D map created. For example binary map. 1 means wall, 0 = empty space.

```ts
const my2DMap: Array<Array<number>> =  [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
];

const camX: number = 3.5;   // starting camera position, column 3.5
const camY: number = 3.5;   // starting camera position, row 3.5
const rot: number = 2.34;   // camera direction in radians
const fov: number = 75;     // field of view angle
const count: number = 256;  // how many rays to cast
```

to cast rays from point, use **castRays** function, and test every intersection that ray makes.
If ray hit a block, return *false* to stop casting ray further and then check position of ray hit in the world (map).

```ts
// casting ray from a camera
const rays: Array<IRay> = tsrays.castRays(my2DMap, camX, camY, rot, fov, 256, (row: number, column: number, index: number): boolean => {
    if (my2DMap[row][column] === 1) {
        return false; // stop casting ray further
    } else {
        return true; // continue with casting ray
    }
});
```

## Scripts

- `npm run build` build library, everything will be in `dist/` folder
- `npm run lint` lint all .ts files
