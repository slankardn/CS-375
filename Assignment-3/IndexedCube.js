/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {
	vertexShader = `
    		in vec4 aPosition;
    		in vec4 aColor;

    		uniform mat4 P;  	// Projection transformation
           uniform mat4 MV;	// Model-view transformation
           const vec4 T = vec4(.5,.5,.5,.5); 	// Translation transformation
           const vec4 S = vec4(.5,.5,.5,1.0);	// scale transformation
           
           out vec4 vColor;
           
    		void main() {
    			vColor = aColor;
        		gl_Position = P * MV * ((aPosition - T)*S);
    		}
	`;
	fragmentShader = `
		in vec4 vColor;
		out vec4 fColor;
		
		void main(){
			//const vec4 red = vec4(1, 0, 0, 1);
			//const vec4 green = vec4(0, 1, 0, 1);
			//fColor = gl_FrontFacing ? green: red;
			fColor = vColor;
		}
	`;
		
	// I need about 12*3*3 = 108 for cube
	let positions = new Float32Array([
		0,0,0,	// 0
		1,0,0,	// 1
		0,1,0,	// 2
		1,1,0,	// 3
		0,0,1,	// 4
		1,0,1,	// 5
		0,1,1,	// 6
		1,1,1,	// 7
	]);
		
	let colors = new Uint8Array([            
		255,0,0,
		123,123,123,
		255,255,0,
		0,255,0,
		0,255,123,
		0,255,255,
		0,0,255,
		255,0,255,

    ]);
    
    let indices = new Uint8Array([
            3, 0, 2,
            3, 1, 0,
            7, 4, 5,
            4, 7, 6,
            0, 4, 6,
            0, 6, 2, // the problem
            6, 3, 2,
            6, 7, 3,
            5, 1, 7,
            7, 1, 3,
            0, 5, 4,
            0, 1, 5,
            
        ]);
	
	
	let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);
			
	let aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);
	
	let aColor = new Attribute(gl, program, "aColor", colors, 3, gl.UNSIGNED_BYTE, true);
	
	indices = new Indices(gl, indices);
	        
      this.draw = () => {
            program.use();
            
            indices.enable();
            
            aPosition.enable();
            aColor.enable();
            gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);
            aColor.disable();
            aPosition.disable();
            
            indices.disable();
        };
    }
};

