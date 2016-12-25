declare const raycast;
import { IRay } from './../dist/interfaces/IRay';

// initialize canvas
const ctx: CanvasRenderingContext2D = (<HTMLCanvasElement> document.getElementById('canvas')).getContext('2d');
const mctx: CanvasRenderingContext2D = (<HTMLCanvasElement> document.getElementById('minimap')).getContext('2d');

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 256, 300);
mctx.fillStyle = "black";
mctx.fillRect(0, 0, 130, 130);

// initiliaze world and camera
const map: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let camX = 3.5;
let camY = 3.5;
let camRot = (Math.PI/2);
const h = 80;

// test every ray's intersection
const testIntersection = (row: number, column: number, cell: number): boolean => {
    if (cell === 1) {
        return false;
    }
    return true;
}

// calculate new position
const forward = (): void => {
    camX += Math.cos(camRot) * 0.5;
    camY += Math.sin(camRot) * 0.5;
};

document.addEventListener("keyup", (e) => {
    switch(e.keyCode) {
        case 38:
            forward();
            break;
        case 37:
            camRot -= (Math.PI/12);
            break;
        case 39:
            camRot += (Math.PI/12);
            break;
        default: {
            console.log('unexpected key');
        }
    }
});

// main
setInterval(() => {
    // 2.5d plot
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 256, 300); // clear canvas
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 150, 256, 150); // draw floor
    // minimap
    mctx.fillStyle = "black";
    mctx.fillRect(0, 0, 130, 130); // clear canvas
    // render minimap
    map.forEach((row: number[], r: number) =>
        row.forEach((cell: number, c: number) => {
            if (cell === 1) {
                mctx.fillStyle = "white";
            } else {
                mctx.fillStyle = "black";
            }
            mctx.fillRect(c * 10, r * 10, c * 10 + 10, r * 10 + 10);
        }));
    // render 2.5d plot
    mctx.strokeStyle = "green";
    const rays: IRay[] = raycast.castRays(map, camX, camY, camRot, testIntersection);
    rays.forEach((ray: IRay, index: number): void => {
        if (ray.side) {
            ctx.fillStyle = "yellow";
        } else {
            ctx.fillStyle = "blue";
        }
        ctx.fillRect(index, 150 - (h/ray.dist), 1, 2 * (h/ray.dist));
        // draw on miminap
        mctx.beginPath();
        mctx.moveTo(Math.floor(camX * 10), Math.floor(camY * 10));
        mctx.lineTo(Math.floor(ray.x * 10), Math.floor(ray.y * 10));
        mctx.stroke();
    });
    const dirRay: IRay = raycast.castRay(map, camX, camY, testIntersection, camRot);
    mctx.strokeStyle = "red";
    mctx.beginPath();
    mctx.moveTo(Math.floor(camX * 10), Math.floor(camY * 10));
    mctx.lineTo(Math.floor(dirRay.x * 10), Math.floor(dirRay.y * 10));
    mctx.stroke();
}, 1000/30);
