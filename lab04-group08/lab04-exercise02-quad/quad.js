"use strict";
class Quad{
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
            0.5 * Math.cos(Math.PI/22), 0.5 * Math.sin(Math.PI/22),
            0.5 * Math.cos(2*Math.PI/22), 0.5 * Math.sin(2 *Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(2*Math.PI/22), 0.5 * Math.sin(2*Math.PI/22),
            0.5 * Math.cos(3*Math.PI/22), 0.5 * Math.sin(3*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(3*Math.PI/22), 0.5 * Math.sin(3*Math.PI/22),
            0.5 * Math.cos(4*Math.PI/22), 0.5 * Math.sin(4*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(4*Math.PI/22), 0.5 * Math.sin(4*Math.PI/22),
            0.5 * Math.cos(5*Math.PI/22), 0.5 * Math.sin(5*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(5*Math.PI/22), 0.5 * Math.sin(5*Math.PI/22),
            0.5 * Math.cos(6*Math.PI/22), 0.5 * Math.sin(6 *Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(6*Math.PI/22), 0.5 * Math.sin(6*Math.PI/22),
            0.5 * Math.cos(7*Math.PI/22), 0.5 * Math.sin(7*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(7*Math.PI/22), 0.5 * Math.sin(7*Math.PI/22),
            0.5 * Math.cos(8*Math.PI/22), 0.5 * Math.sin(8*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(8*Math.PI/22), 0.5 * Math.sin(8*Math.PI/22),
            0.5 * Math.cos(9*Math.PI/22), 0.5 * Math.sin(9*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(9*Math.PI/22), 0.5 * Math.sin(9*Math.PI/22),
            0.5 * Math.cos(10*Math.PI/22), 0.5 * Math.sin(10 *Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(10*Math.PI/22), 0.5 * Math.sin(10*Math.PI/22),
            0.5 * Math.cos(11*Math.PI/22), 0.5 * Math.sin(11*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(11*Math.PI/22), 0.5 * Math.sin(11*Math.PI/22),
            0.5 * Math.cos(12*Math.PI/22), 0.5 * Math.sin(12*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(12*Math.PI/22), 0.5 * Math.sin(12*Math.PI/22),
            0.5 * Math.cos(13*Math.PI/22), 0.5 * Math.sin(13*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(13*Math.PI/22), 0.5 * Math.sin(13*Math.PI/22),
            0.5 * Math.cos(14*Math.PI/22), 0.5 * Math.sin(14*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(14*Math.PI/22), 0.5 * Math.sin(14*Math.PI/22),
            0.5 * Math.cos(15*Math.PI/22), 0.5 * Math.sin(15*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(15*Math.PI/22), 0.5 * Math.sin(15*Math.PI/22),
            0.5 * Math.cos(16*Math.PI/22), 0.5 * Math.sin(16*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(16*Math.PI/22), 0.5 * Math.sin(16*Math.PI/22),
            0.5 * Math.cos(17*Math.PI/22), 0.5 * Math.sin(17*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(17*Math.PI/22), 0.5 * Math.sin(17*Math.PI/22),
            0.5 * Math.cos(18*Math.PI/22), 0.5 * Math.sin(18*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(18*Math.PI/22), 0.5 * Math.sin(18*Math.PI/22),
            0.5 * Math.cos(19*Math.PI/22), 0.5 * Math.sin(19*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(19*Math.PI/22), 0.5 * Math.sin(19*Math.PI/22),
            0.5 * Math.cos(20*Math.PI/22), 0.5 * Math.sin(20*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(20*Math.PI/22), 0.5 * Math.sin(20*Math.PI/22),
            0.5 * Math.cos(21*Math.PI/22), 0.5 * Math.sin(21*Math.PI/22),
            0.0, 0.0,
            0.5 * Math.cos(21*Math.PI/22), 0.5 * Math.sin(21*Math.PI/22),
            0.5 * Math.cos(22*Math.PI/22), 0.5 * Math.sin(22 *Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(22*Math.PI/22), 0.5 * Math.sin(22*Math.PI/22),
                0.5 * Math.cos(23*Math.PI/22), 0.5 * Math.sin(23*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(23*Math.PI/22), 0.5 * Math.sin(23*Math.PI/22),
                0.5 * Math.cos(24*Math.PI/22), 0.5 * Math.sin(24*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(24*Math.PI/22), 0.5 * Math.sin(24*Math.PI/22),
                0.5 * Math.cos(25*Math.PI/22), 0.5 * Math.sin(25*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(25*Math.PI/22), 0.5 * Math.sin(25*Math.PI/22),
                0.5 * Math.cos(26*Math.PI/22), 0.5 * Math.sin(26 *Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(26*Math.PI/22), 0.5 * Math.sin(26*Math.PI/22),
                0.5 * Math.cos(27*Math.PI/22), 0.5 * Math.sin(27*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(27*Math.PI/22), 0.5 * Math.sin(27*Math.PI/22),
                0.5 * Math.cos(28*Math.PI/22), 0.5 * Math.sin(28*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(28*Math.PI/22), 0.5 * Math.sin(28*Math.PI/22),
                0.5 * Math.cos(29*Math.PI/22), 0.5 * Math.sin(29*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(29*Math.PI/22), 0.5 * Math.sin(29*Math.PI/22),
                0.5 * Math.cos(30*Math.PI/22), 0.5 * Math.sin(30*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(30*Math.PI/22), 0.5 * Math.sin(30*Math.PI/22),
                0.5 * Math.cos(31*Math.PI/22), 0.5 * Math.sin(31*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(31*Math.PI/22), 0.5 * Math.sin(31*Math.PI/22),
                0.5 * Math.cos(32*Math.PI/22), 0.5 * Math.sin(32*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(32*Math.PI/22), 0.5 * Math.sin(32*Math.PI/22),
                0.5 * Math.cos(33*Math.PI/22), 0.5 * Math.sin(33*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(33*Math.PI/22), 0.5 * Math.sin(33*Math.PI/22),
                0.5 * Math.cos(34*Math.PI/22), 0.5 * Math.sin(34*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(34*Math.PI/22), 0.5 * Math.sin(34*Math.PI/22),
                0.5 * Math.cos(35*Math.PI/22), 0.5 * Math.sin(35*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(35*Math.PI/22), 0.5 * Math.sin(35*Math.PI/22),
                0.5 * Math.cos(36*Math.PI/22), 0.5 * Math.sin(36*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(36*Math.PI/22), 0.5 * Math.sin(36*Math.PI/22),
                0.5 * Math.cos(37*Math.PI/22), 0.5 * Math.sin(37*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(37*Math.PI/22), 0.5 * Math.sin(37*Math.PI/22),
                0.5 * Math.cos(38*Math.PI/22), 0.5 * Math.sin(38 *Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(38*Math.PI/22), 0.5 * Math.sin(38*Math.PI/22),
                0.5 * Math.cos(39*Math.PI/22), 0.5 * Math.sin(39*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(39*Math.PI/22), 0.5 * Math.sin(39*Math.PI/22),
                0.5 * Math.cos(40*Math.PI/22), 0.5 * Math.sin(40*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(40*Math.PI/22), 0.5 * Math.sin(40*Math.PI/22),
                0.5 * Math.cos(41*Math.PI/22), 0.5 * Math.sin(41*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(41*Math.PI/22), 0.5 * Math.sin(41*Math.PI/22),
                0.5 * Math.cos(42*Math.PI/22), 0.5 * Math.sin(42*Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(42*Math.PI/22), 0.5 * Math.sin(42*Math.PI/22),
                0.5 * Math.cos(43*Math.PI/22), 0.5 * Math.sin(43 *Math.PI/22),
                0.0, 0.0,
                0.5 * Math.cos(43*Math.PI/22), 0.5 * Math.sin(43*Math.PI/22),
                0.5 * Math.cos(44*Math.PI/22), 0.5 * Math.sin(44*Math.PI/22),
                0.0, 0.0
        ];

        // this.indexData = [
        //     0, 1, 2,    //first triangle
        //     1, 2, 3     //second triangle
        // ];

        // create position buffer.
        this.positionBuffer = gl.createBuffer();
        // set id to the current active array buffer (only one can be active).
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        // upload buffer data.
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positionData), gl.STATIC_DRAW);

        // this.indexBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
        // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexData), gl.STATIC_DRAW);
        this.vertexCount = 128;
	}
};
