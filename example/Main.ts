declare const raycast;

// initialize canvas
const ctx: CanvasRenderingContext2D = (<HTMLCanvasElement> document.getElementById('canvas')).getContext('2d');
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 256, 300);

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

const camX: number = 3.5;
const camY: number = 3.5;
const camRot: number = 2.34;
const h: number = 80;

// test every ray's intersection
const testIntersection = (row: number, column: number): boolean => {
    if (map[row][column] === 1) {
        return false;
    }
    return true;
}

// main
setInterval(() => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 256, 300);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 150, 256, 150);
    const rays: any[] = raycast.castRays(map, camX, camY, camRot, testIntersection);
    rays.forEach((ray: any, index: number): void => {
        if (ray.side) {
            ctx.fillStyle = "yellow";
        } else {
            ctx.fillStyle = "blue";
        }
        ctx.fillRect(index, 150 - (h/ray.dist), 1, 2 * (h/ray.dist));
    });
}, 1000/3);
