
let gl = undefined;

function init() {
    
    let canvas = document.getElementById("webgl-canvas");
    let gl = canvas.getContext("webgl2");

    gl.clearColor(0.2, 0.2, 0.2, 1.0); //gl.clearColor(r, g, b, a);
    gl.cullFace(gl.BACK_FACE);
    gl.enable(gl.CULL_FACE);

    gl.enable(gl.DEPTH_TEST);

    let tetra = new Tetrahedron(gl);
    let cone = new Cone(gl, 16);
    let circle = new Cylinder (gl, 18);
    
    tetra.color = vec4(0,1,1,1);
    cone.color = vec4(1,0,1,1);
    circle.color = vec4(1,1,0,1);
      
    let ms = new MatrixStack();
        
    angle = 0.0;
    let angleTri = angle;
    let angleCone = angle;
    let angleCircle = angle;
    
    function render() {
    		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    		
    		angleTri += 5.0;
    		angleTri %= 360.0;
    		
    		angleCone += 3.0;
    		angleCone %= 360.0;
    		
    		angleCircle += 1.0;
    		angleCircle %= 360.0;


    		ms.push();
    		ms.translate(-0.5, -0.5, 0);
    		ms.rotate(angleTri , [1, 1, 0]);
    		ms.scale(0.5);
    		tetra.MV = ms.current();
    		tetra.draw();
    		ms.pop();
    		
    		ms.push();
    		ms.translate(0.5, -0.5, 0);
    		ms.rotate(angleCone, [1, 0, 0]);
    		ms.scale(0.4);
    		cone.MV = ms.current();
    		cone.draw();
    		ms.pop();
    		
    		ms.push();
    		ms.rotate(angleCircle, [1, 1, 1]);
    		ms.translate(0.5, 0.5, 0);
    		ms.scale(0.3);
    		circle.MV = ms.current();
    		circle.draw();
    		ms.pop();
    		
    		requestAnimationFrame(render);
    		
	}
     	render();
}

window.onload = init;
