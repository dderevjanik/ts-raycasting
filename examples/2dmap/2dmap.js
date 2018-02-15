/// <reference path="../../dist/interfaces/IRay.d.ts"/>
var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
// initialize canvas and camera
var ctx = document.getElementById('minimap').getContext('2d');
var camera = {
    x: 1.5,
    y: 1.5,
    rot: (Math.PI / 2),
    h: 60
};
var intersection = function (row, column, cell, dist) {
    if (cell === 1) {
        return false;
    }
    return true;
};
var render = function (map, rays) {
    // clear first
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 100, 60);
    // render map
    map.forEach(function (row, r) {
        row.forEach(function (cell, c) {
            if (cell === 1) {
                ctx.fillStyle = 'black';
            }
            else {
                ctx.fillStyle = 'white';
            }
            ctx.fillRect(c * 10, r * 10, c * 10 + 10, r * 10 + 10);
        });
    });
    // render rays
    ctx.strokeStyle = 'green';
    rays.forEach(function (ray, index) {
        ctx.beginPath();
        ctx.moveTo(Math.floor(camera.x * 10), Math.floor(camera.y * 10));
        ctx.lineTo(Math.floor(ray.x * 10), Math.floor(ray.y * 10));
        ctx.stroke();
    });
};
var cycle = function () {
    render(map, raycast.castRays(map, camera.x, camera.y, camera.rot, intersection));
    setTimeout(cycle, 1000 / 30);
};
setTimeout(cycle, 1000 / 30);
