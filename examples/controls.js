var forward = function (camera) {
    camera.x += Math.cos(camera.rot) * 0.5;
    camera.y += Math.sin(camera.rot) * 0.5;
};

document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 38:
            forward(camera);
            break;
        case 37:
            camera.rot -= (Math.PI / 12);
            break;
        case 39:
            camera.rot += (Math.PI / 12);
            break;
        default: {
            console.log('unexpected key');
        }
    }
});
