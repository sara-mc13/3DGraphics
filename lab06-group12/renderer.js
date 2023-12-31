"use strict";

class Renderer{

    /**
    * Creates a new instance of Renderer. The given source code will be compiled
    * and assembled into a WebGL ShaderProgram used by this shader to draw models.
    * @param {string} shaderName the source code (text) of this shader programs shader.
    */
	constructor(shaderName){
		this.program = GLUtils.createShaderProgram(shaderName);
	}

    /**
    * Draws a model using this Renderers ShaderProgram.
    * @param {ModelTransform} model the model to draw.
    * @param {Object} shaderData whatever other data the ShaderProgram needs for drawing.
    */
    drawModel(model, shaderData){

        // activate this shader program
        gl.useProgram(this.program);

        // set the arrtibute arrays and uniform data for this programs vertex and
        // fragment shader based on the models buffer data and material
        this.setVertexAttributeArrays(model);
        this.setUniformData(model, shaderData);

        // draw call using index based triangle assembly (elements)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.bufIndex);
        gl.drawElements(model.mesh.drawMode, model.mesh.indexCount, gl.UNSIGNED_SHORT, 0);

        return this;
	}

    /**
    * Sets ALL attributes for the vertex shader of this renderers shader program before drawing.
    * @param {ModelTransform} model the model to draw.
    */
    setVertexAttributeArrays(model){
        // TODO: Set up the pointer of buffer and position vertex attribute
        // Hint: Remember all the steps required!
            // 1. Bind buffer
            // 2. Enable the Vertex Attribute Array
            // 3. Set the Vertex Attribute Pointer
        gl.bindBuffer(gl.ARRAY_BUFFER, model.mesh.positionBuffer);
        let positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
        let positionSize = 2;
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, positionSize, gl.FLOAT, false, 0, 0);
        // Hint: The buffer is stored with the mesh: model.mesh.positionBuffer (see common/primitives.js)
        // Hint: The name for the position attribute is found in the vertex shader ( see shaders/standardShader.glsl)
        // Hint: The shader program is stored in this class: this.program

    }

    /**
    * Sets ALL uniforms for the vertex and fragment shader of this renderers shader program before drawing.
    * @param {ModelTransform} model the model to draw.
    * @param {Object} shaderData whatever other data the Shader needs for drawing.
    */
    setUniformData(model, shaderData){
        // TODO: set uniform data for model matrix
        // Hint: The shader program is stored in this class: this.program
        // Hint: The name for the uniform is found in shaders/standardShader.glsl
        // Hint: The model matrix is stored at model.modelMatrix  (see modeltransform.js)
        let matrixLocation = gl.getUniformLocation(this.program, "u_matrixM");
        gl.uniformMatrix3fv(matrixLocation, false, model.modelMatrix.toFloat32());

        // TODO: set uniform data for tint-color
        // Hint: The shader program is stored in this class: this.program
        // Hint: The name for the uniform is found in shaders/standardShader.glsl
        // Hint: The tint color is part of the models material (model.material),
        // which is set in engine2D.html. It is a V3.
        let colorLocation = gl.getUniformLocation(this.program, "u_tint");
        gl.uniform3fv(colorLocation, model.material.tint.toFloat32());
    }
}
