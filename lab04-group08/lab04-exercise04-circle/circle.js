"use strict";
class Circle{
    /**
    * Contructor: Creates an instance of Quad.
    * @param {float} offsetX the center of the Quad on the x axis.
    * @param {float} offsetY the center of the Quad on the y axis.
    * @param {float} scale the scale of the Quad.
    * @param {array} tint the tint-color [r,g,b] of the Quad.
    */
    constructor(offsetX, offsetY, scale, tint){
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;
        this.tint = tint;

        this.positionData = [
              //QUADRANT 1
              0.5* Math.cos(0), 0.5 *Math.sin(0),
              0.5* Math.cos(Math.PI/8), 0.5 *Math.sin(Math.PI/8),
              0,0,
              0.5* Math.cos(Math.PI/8), 0.5 *Math.sin(Math.PI/8),
              0.5* Math.cos(Math.PI/4), 0.5 *Math.sin(Math.PI/4),
              0,0,
              0.5* Math.cos(Math.PI/4), 0.5 *Math.sin(Math.PI/4),
              0.5* Math.cos(3*Math.PI/8), 0.5 *Math.sin(3*Math.PI/8),
              0,0,
              0.5* Math.cos(Math.PI/2), 0.5 *Math.sin(Math.PI/2),
              0.5* Math.cos(3*Math.PI/8), 0.5 *Math.sin(3*Math.PI/8),
              0,0,
          //QUADRANT 2
              0.5* Math.cos(Math.PI/2), 0.5 *Math.sin(Math.PI/2),
              0.5* Math.cos(5*Math.PI/8), 0.5 *Math.sin(5*Math.PI/8),
              0,0,
              0.5* Math.cos(5*Math.PI/8), 0.5 *Math.sin(5*Math.PI/8),
              0.5* Math.cos(6*Math.PI/8), 0.5 *Math.sin(6*Math.PI/8),
              0,0,
              0.5* Math.cos(6*Math.PI/8), 0.5 *Math.sin(6*Math.PI/8),
              0.5* Math.cos(7*Math.PI/8), 0.5 *Math.sin(7*Math.PI/8),
              0,0,
              0.5* Math.cos(7*Math.PI/8), 0.5 *Math.sin(7*Math.PI/8),
              0.5* Math.cos(Math.PI), 0.5 *Math.sin(Math.PI),
              0,0,
          //QUADRANT 3
              0.5* Math.cos(-Math.PI/2), 0.5 *Math.sin(-Math.PI/2),
              0.5* Math.cos(-5*Math.PI/8), 0.5 *Math.sin(-5*Math.PI/8),
              0,0,
              0.5* Math.cos(-5*Math.PI/8), 0.5 *Math.sin(-5*Math.PI/8),
              0.5* Math.cos(-6*Math.PI/8), 0.5 *Math.sin(-6*Math.PI/8),
              0,0,
              0.5* Math.cos(-6*Math.PI/8), 0.5 *Math.sin(-6*Math.PI/8),
              0.5* Math.cos(-7*Math.PI/8), 0.5 *Math.sin(-7*Math.PI/8),
              0,0,
              0.5* Math.cos(-7*Math.PI/8), 0.5 *Math.sin(-7*Math.PI/8),
              0.5* Math.cos(-Math.PI), 0.5 *Math.sin(-Math.PI),
              0,0,
          //QUADRANT 4
              0.5* Math.cos(0), 0.5 *Math.sin(0),
              0.5* Math.cos(-Math.PI/8), 0.5 *Math.sin(-Math.PI/8),
              0,0,
              0.5* Math.cos(-Math.PI/8), 0.5 *Math.sin(-Math.PI/8),
              0.5* Math.cos(-Math.PI/4), 0.5 *Math.sin(-Math.PI/4),
              0,0,
              0.5* Math.cos(-Math.PI/4), 0.5 *Math.sin(-Math.PI/4),
              0.5* Math.cos(-3*Math.PI/8), 0.5 *Math.sin(-3*Math.PI/8),
              0,0,
              0.5* Math.cos(-Math.PI/2), 0.5 *Math.sin(-Math.PI/2),
              0.5* Math.cos(-3*Math.PI/8), 0.5 *Math.sin(-3*Math.PI/8),
              0,0
        ];

       

        // create position buffer.
        this.positionBuffer = gl.createBuffer();
        // set id to the current active array buffer (only one can be active).
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        // upload buffer data.
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positionData), gl.STATIC_DRAW);
      
        this.vertexCount = 48;
	}
};
