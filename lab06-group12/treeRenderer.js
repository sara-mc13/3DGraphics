"use strict";
class TreeRenderer extends Renderer {
    setUniformData(model, shaderData) {
        super.setUniformData(model, shaderData);

        let timeLoc = gl.getUniformLocation(this.program, "u_Time");
        gl.uniform1f(timeLoc,shaderData.time);
    }
}