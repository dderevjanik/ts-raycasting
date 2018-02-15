/// <reference path="../../dist/interfaces/IRay.d.ts"/>

let map: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// initialize canvas and camera
const ctx = (document.getElementById('minimap') as HTMLCanvasElement).getContext('2d');
const camera = {
    x: 1.5,
    y: 1.5,
    rot: (Math.PI / 2),
    h: 60
};

const intersection = (row: number, column: number, cell: number, dist: number) => {
    if (cell === 1) {
        return false;
    }
    return true;
};

const render = (map: number[][], rays: IRay[]) => {
    // clear first
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 100, 60);
    // render map
    map.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (cell === 1) {
                ctx.fillStyle = 'black';
            } else {
                ctx.fillStyle = 'white';
            }
            ctx.fillRect(c * 10, r * 10, c * 10 + 10, r * 10 + 10);
        });
    });
    // render rays
    ctx.strokeStyle = 'green';
    rays.forEach((ray: IRay, index: number) => {
        ctx.beginPath();
        ctx.moveTo(Math.floor(camera.x * 10), Math.floor(camera.y * 10));
        ctx.lineTo(Math.floor(ray.x * 10), Math.floor(ray.y * 10));
        ctx.stroke();
    });
};

const cycle = () => {
    render(map, raycast.castRays(map, camera.x, camera.y, camera.rot, intersection));
    setTimeout(cycle, 1000 / 30);
};

setTimeout(cycle, 1000 / 30);
