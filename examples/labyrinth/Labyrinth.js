"use strict";
// initialize canvas
var ctx = document.getElementById('canvas').getContext('2d');
var mctx = document.getElementById('minimap').getContext('2d');
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 256, 300);
mctx.fillStyle = "black";
mctx.fillRect(0, 0, 130, 130);
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
var camRot = (Math.PI / 2);
var h = 80;
// test every ray's intersection
var testIntersection = function (row, column, cell) {
    if (cell === 1) {
        return false;
    }
    return true;
};
// calculate new position
var forward = function () {
    camX += Math.cos(camRot) * 0.5;
    camY += Math.sin(camRot) * 0.5;
};
document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 38:
            forward();
            break;
        case 37:
            camRot -= (Math.PI / 12);
            break;
        case 39:
            camRot += (Math.PI / 12);
            break;
        default: {
            console.log('unexpected key');
        }
    }
});
// main
setInterval(function () {
    // 2.5d plot
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 256, 300); // clear canvas
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 150, 256, 150); // draw floor
    // minimap
    mctx.fillStyle = "black";
    mctx.fillRect(0, 0, 130, 130); // clear canvas
    // render minimap
    map.forEach(function (row, r) {
        return row.forEach(function (cell, c) {
            if (cell === 1) {
                mctx.fillStyle = "white";
            }
            else {
                mctx.fillStyle = "black";
            }
            mctx.fillRect(c * 10, r * 10, c * 10 + 10, r * 10 + 10);
        });
    });
    // render 2.5d plot
    mctx.strokeStyle = "green";
    var rays = raycast.castRays(map, camX, camY, camRot, testIntersection);
    rays.forEach(function (ray, index) {
        if (ray.side) {
            ctx.fillStyle = "yellow";
        }
        else {
            ctx.fillStyle = "blue";
        }
        ctx.fillRect(index, 150 - (h / ray.dist), 1, 2 * (h / ray.dist));
        // draw on miminap
        mctx.beginPath();
        mctx.moveTo(Math.floor(camX * 10), Math.floor(camY * 10));
        mctx.lineTo(Math.floor(ray.x * 10), Math.floor(ray.y * 10));
        mctx.stroke();
    });
    var dirRay = raycast.castRay(map, camX, camY, testIntersection, camRot);
    mctx.strokeStyle = "red";
    mctx.beginPath();
    mctx.moveTo(Math.floor(camX * 10), Math.floor(camY * 10));
    mctx.lineTo(Math.floor(dirRay.x * 10), Math.floor(dirRay.y * 10));
    mctx.stroke();
}, 1000 / 30);
