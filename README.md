# TS RayCasting

[![Greenkeeper badge](https://badges.greenkeeper.io/dderevjanik/ts-raycasting.svg)](https://greenkeeper.io/)

![Travis](https://travis-ci.org/dderevjanik/ts-raycasting.svg?branch=master)

![Raycast Example](docs/img/raycasting-example.gif)

[Tutorial](docs/tutorial.md)

## Overview

TS RayCasting is tiny and fast raycast library written in Typescript.

### API

![castray-example](docs/img/castray-fnc.png)

#### castRay(map, x, y, intersection, rayRot)

```typescript
castRay(map: number[][], x: number, y: number, intersection: testintersection, rayRot: number): IRay
```

Will cast ray from position in map, which is two-dimensional world of numbers, where
every number means a specific wall. To check if ray already hit a wall, there's **intersection**
callback. If testfunction returns false, then it'll stop casting ray further and
it means that wall was hit.

#### castRays(map, x, y, rot, intersection, config)

```typescript
castRays(map: number[][], x: number, y: number, rot: number, intersection: testintersection, config: IRayConf = defaultConfig): IRay[]
```

Will cast several rays from position in map, which is two-dimensional world of numbers,
where every number means a specific wall. *rot* is direction of camera or caster.
To check if ray already hit a wall, there's **intersection** callback.
If testfunction returns false, then it'll stop casting ray further and it
means that wall was hit.

#### intersection(row, column, dist, index)

```typescript
type testintersection = (row: number, column: number, dist: number, index: number) => boolean;
```

It's same callback in both **castRay** and **castRays** function, where is put a
logic of hitting a wall. If testFunctions returns false, it'll stop casting
ray further (specific ray, not all rays in **castRays** function).

## Devs

- `npm run build` build library, everything will be in `dist/` folder
- `npm run build:web` build minified raycast library for browser
- `npm run build:node` build library with all declaration files
- `npm run build:example` build examples
- `npm run lint` lint all .ts files
