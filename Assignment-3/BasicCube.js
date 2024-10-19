/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
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
		 1.0, 1.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            
            1.0, 1.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            
            1.0, 1.0, 1.0,
            0.0, 0.0, 1.0,
            1.0, 0.0, 1.0,
            
            0.0, 0.0, 1.0,
            1.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            
            0.0, 0.0, 0.0,
            0.0, 0.0, 1.0,
            0.0, 1.0, 1.0,
            
            0.0, 0.0, 0.0,
            0.0, 1.0, 1.0,
            0.0, 1.0, 0.0,
            
            0.0, 1.0, 1.0,
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            
            0.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 0.0,
            
            1.0, 0.0, 1.0,
            1.0, 0.0, 0.0,
            1.0, 1.0, 1.0,
            
            1.0, 1.0, 1.0,
            1.0, 0.0, 0.0,
            1.0, 1.0, 0.0,
            
            0.0, 0.0, 0.0,
            1.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 1.0,

		]);
		
		let colors = new Uint8Array([            
		 255, 255, 0.0,
            0.0, 0.0, 0.0,
            0.0, 255, 0.0,
            
            255, 255, 0.0,
            255, 0.0, 0.0,
            0.0, 0.0, 0.0,
            
            255, 255, 255,
            0.0, 0.0, 255,
            255, 0.0, 255,
            
            0.0, 0.0, 255,
            255, 255, 255,
            0.0, 255, 255,
            
            0.0, 0.0, 0.0,
            0.0, 0.0, 255,
            0.0, 255, 255,
            
            0.0, 0.0, 0.0,
            0.0, 255, 255,
            0.0, 255, 0.0,
            
            0.0, 255, 255,
            255, 255, 0.0,
            0.0, 255, 0.0,
            
            0.0, 255, 255,
            255, 255, 255,
            255, 255, 0.0,
            
            255, 0.0, 255,
            255, 0.0, 0.0,
            255, 255, 255,
            
            255, 255, 255,
            255, 0.0, 0.0,
            255, 255, 0.0,
            
            0.0, 0.0, 0.0,
            255, 0.0, 255,
            0.0, 0.0, 255,
            
            0.0, 0.0, 0.0,
            255, 0.0, 0.0,
            255, 0.0, 255,

    ]);
		
	
	
	let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);
			
	let aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);
	
	let aColor = new Attribute(gl, program, "aColor", colors, 3, gl.UNSIGNED_BYTE, true);
	        
      this.draw = () => {
            program.use();
            
            aPosition.enable();
            aColor.enable();
            gl.drawArrays(gl.TRIANGLES, 0, aPosition.count);
            aColor.disable();
            aPosition.disable();
        };
    }
};

