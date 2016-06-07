// initialize canvas
var ctx = document.getElementById('canvas').getContext('2d');
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 256, 300);
// initiliaze world and camera
var map = [
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
var camX = 3.5;
var camY = 3.5;
var camRot = 1.84;
var h = 80;
// test every ray's intersection
var testIntersection = function (row, column) {
    if (map[row][column] === 1) {
        return false;
    }
    return true;
};
// calculate new position
var forward = function () {
    camX += Math.cos(camRot) * 0.5;
    camY += Math.sin(camRot) * 0.5;
};
// main
setInterval(function () {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 256, 300); // clear canvas
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 150, 256, 150); // draw floor
    var rays = raycast.castRays(map, camX, camY, camRot, testIntersection);
    rays.forEach(function (ray, index) {
        if (ray.side) {
            ctx.fillStyle = "yellow";
        }
        else {
            ctx.fillStyle = "blue";
        }
        ctx.fillRect(index, 150 - (h / ray.dist), 1, 2 * (h / ray.dist));
    });
}, 1000 / 3);
