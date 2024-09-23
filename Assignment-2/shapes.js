
let gl = undefined;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    //gl.clearColor(0.2, 0.2, 0.2, 1.0); IDK what this does but might be important
    
}

function render() {
    // Add rendering code here
}

window.onload = init;

