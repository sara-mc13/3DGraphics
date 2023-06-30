"use strict";
/**
* gl-utils
* A file containing all kinds of utility functions to work with WebGL.
* For example: Fetching the shader source code from the DOM and creating a
* shader from it.
*/
class GLUtils{

    /**
    * Creates and returns a webgl instance for the given canvas.
    * @param {Canvas} canvas the WebGL context for this application.
    * @param {bool} fitScreen should the canvas always try to fit the browser window size?
    * @return {WebGLRenderingContext} a webgl context, with debugging enabled.
    */
    static createWebGLInstance(canvas, fitScreen = false){
        // first make sure people don't use file protocol.
        if(location.protocol == "file:"){
            throw new Error(` You opened the file from your explorer or finder. That means the
File:// was protocol used to load WebGL engine. Ressources and Files can not be loaded with this protocol
Http:// or https:// is required. Make sure to use a server (hosted, local or simulated).
For example in Atom install atom-live-server package and start with Packages -> atom-live-server. There is a simmilar plugin called Live Server for Visual Studio and Visual Studio Code`);
            return null;
        }

        let gl = canvas.getContext("webgl"); // WebGLRenderingContext
        // post error if not supported
        if(!gl){ console.error("WebGL context is not available."); }

        gl = WebGLDebugUtils.makeDebugContext(gl); // enable debugging

        //--------------------------------------------------
        // size management, set scaling of canvas element always to be full window size
    	gl.setSize = function(w,h){
    		//set the size of the canvas, on chrome we need to set it 3 ways to make it work perfectly.
    		gl.canvas.style.width = w + "px";
    		gl.canvas.style.height = h + "px";
    		gl.canvas.width = w;
    		gl.canvas.height = h;

    		//when updating the canvas size, must reset the viewport of the canvas
    		//else the resolution webgl renders at will not change
    		gl.viewport(0,0,w,h);
    		return this;
    	}
    	gl.fitScreen = function(wp,hp){
    		return this.setSize((window.innerWidth - 15 )*(wp || 1), (window.innerHeight - 30) * (hp || 1));
    	}
        if(fitScreen){
            window.onresize = function(){gl.fitScreen();}; gl.fitScreen();
            gl.fitScreen();
        }

        return gl;
    }

    /**
    * Looks in the html file for the script element with the given element ID.
    * @param {string} elementID ID of the script with the source text (code) of the shader.
    * @return {string} The text (code) contained in the element with elementID.
    */
    static getDomShaderSrc(elementID){
        let element = document.getElementById(elementID);
        if(!element || element.text == ""){
            console.log(elementID + " shader not found or no text."); return null;
        }
        return element.text;
    }

    /**
    * Creates and returns a ShaderProgram from the given vertex and fragment shader sources.
    * @param {string} shaderName the source text (code) of the shader.
    * @return {WebGLShaderProgram} A Shaderprogram, initialized, linked and validated.
    */
    static createShaderProgram(shaderName){
        // create shaders, set source code and compile them
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        let vertexShaderScr = "#define VERTEX_SHADER\n" + GLUtils.shaderSrcCache[shaderName];
        let fragmentShaderSrc = "#define FRAGMENT_SHADER\n" + GLUtils.shaderSrcCache[shaderName];

        gl.shaderSource(vertexShader, vertexShaderScr);
        gl.shaderSource(fragmentShader, fragmentShaderSrc);
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);
        // check for compiler errors in vertex and fragment shader
        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
            console.error('ERROR could not compile vertex shader.', gl.getShaderInfoLog(vertexShader));
            return -1;
        }
        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
            console.error('ERROR could not compile fragment shader.', gl.getShaderInfoLog(fragmentShader));
            return -1;
        }
        // create shader program and attach vertex and fragment shader
        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        // Link Program, completing its preparation and uploading to the GPU
        gl.linkProgram(shaderProgram);
        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
            console.error('ERROR linking program \"" + shaderName+"\""', gl.getProgramInfoLog(shaderProgram));
            return -1;
        }
        console.log("SUCCESS: Created shader program: \"" + shaderName+"\"");
        return shaderProgram;
    }

    /**
    * Creates and returns a mesh object assembled from the given data.
    * It is deposited in the MeshCache using its name.
    * @param {string} name the name of the mesh that will be used to retrieve it from the MeshCache.
    * @param {WebGLDrawMode} drawMode gl.TRIANGLES, gl TRIANGLE_FAN etc. drawmode when calling gl.drawArrays.
    * @param {Array} positionData array of numbers containing the position data for this mesh.
    * @param {Array} indexData array of numbers containing the index data for this mesh.
    * @return {object} the mesh object created with the given parameters and fully initialized buffers and vao. Ready to use.
    */
    static createMesh(name, drawMode, indexData, positionData){
        let mesh = {drawMode: drawMode,
                    indexData: indexData,
                    positionData: positionData
                };

        //.......................................................
        //Set up vertices
        if(positionData !== undefined && positionData != null){
            mesh.positionBuffer = gl.createBuffer();											//Create buffer...
            mesh.vertexComponentLen = 2;													//How many floats make up a vertex
            mesh.vertexCount = positionData.length / mesh.vertexComponentLen;				//How many vertices in the array

            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);	//then push array into it.
        }

        //.......................................................
        //Setup Index.
        if(indexData !== undefined && indexData != null){
            mesh.bufIndex = gl.createBuffer();
            mesh.indexCount = indexData.length;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.bufIndex);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
        }

        //Clean up
        //Unbind any buffers that might be set AFTER we unbind the VAO!
        gl.bindBuffer(gl.ARRAY_BUFFER,null);
        if(indexData !== undefined && indexData != null){
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
        }

        //store mesh in MeshCache with name as reference.
        MeshCache[name] = mesh;
        return mesh;
    }

    static loadShaders(paths, onComplete){
        let completed = 0;
        let total = paths.length;

        // for each path, load shader file at that location using AJAX
        paths.forEach((path) => {

            function onSuccesfullLoad(src){
                // extract shader name from path
                let splitEnd = path.lastIndexOf(".");
                if(splitEnd == -1) splitEnd = path.length;

                let shaderName = path.substring(
                    path.indexOf("/") + 1 , splitEnd);

                if(!GLUtils.shaderSrcCache) GLUtils.shaderSrcCache = [];

                GLUtils.shaderSrcCache[shaderName] = src;

                completed++;
                console.log("SUCCESS: Loaded shader source for: \"" + shaderName+"\" (" + path + ")");
                if(completed == total) onComplete();
            }

            function onLoadingError(error){
                console.error("Error loading file: " + path + ", with response: " + error);
            }

            GLUtils.loadTextFileAJAX(path, onSuccesfullLoad, onLoadingError);
        });
    }

    static loadTextFileAJAX(name, onSucces, onError){
        var xhr = new XMLHttpRequest(),
            okStatus = document.location.protocol === "file:" ? 0 : 200;
        xhr.open('GET', name, true);
        xhr.onreadystatechange= function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            if (xhr.status !== 200) {
                onError(xhr.responseText);
                return;
            }
            onSucces(xhr.responseText);
        };
        xhr.send(null);
    }
}
