# Tutorial

## 2D Map

First, you need import a ts-raycasting library into your project

```typescript
import tsrays from 'ts-raycasting';
```

and have 2D world created. For example consisting by binary number, where 1
means wall, 0 = empty space. Something like this bellow.

```typescript
const my2DMap =  [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
];
```

Also, don't forget to define your camera's starting position and default rotation angle.
Let's create some vars.

```typescript
const camX = 3.5;   // starting camera position, column 3.5
const camY = 3.5;   // starting camera position, row 3.5
const rot = 2.34;   // camera direction in radians
const fov = 75;     // field of view angle
const count = 256;  // how many rays to cast
```

In order to cast rays from camera's position, use `castRays` function,
and test every intersection that ray makes with world's grid. If ray hit a block,
return `false` to stop casting ray further. If there's no block hit, cast ray further
and return `true` value. After calling `castRays` function, it'll return a array
of rays.

```typescript
// casting ray from a camera
const rays: IRay[] = tsrays.castRays(my2DMap, camX, camY, rot, (row: number, column: number, dist: number, index: number): boolean => {
    if (my2DMap[row][column] === 1) {
        // Wall hit !
        return false; // stop casting ray further
    } else {
        return true; // continue with casting ray
    }
}, {fov: fov, count: 256, fisheye: false});
```

## Rendering pseudo 3D

Work in progress
