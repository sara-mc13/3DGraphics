
#ifdef VERTEX_SHADER
// ------------------------------------------------------//
// ----------------- VERTEX SHADER ----------------------//
// ------------------------------------------------------//

attribute vec3 a_position; // the position of each vertex
attribute vec3 a_normal;   // the surface normal of each vertex
attribute vec2 a_texcoord;
//TODO: Add a_texcoord attribute

uniform mat4 u_matrixM; // the model matrix of this object
uniform mat4 u_matrixV; // the view matrix of the camera
uniform mat4 u_matrixP; // the projection matrix of the camera
uniform mat3 u_matrixInvTransM;
varying vec3 v_normal;    // normal to forward to the fragment shader
varying vec2 v_texcoord;
//TODO: Add v_texcoord varying

uniform vec3 u_lightWorldPosition;
uniform mat4 u_world;
varying vec3 v_surfaceToLight;

void main() {
    v_normal = normalize(u_matrixInvTransM * a_normal); // set normal data for fragment shader

    //TODO: Transfer texCoord attribute value to varying
    v_texcoord = a_texcoord;
    gl_Position = u_matrixP * u_matrixV * u_matrixM * vec4 (a_position, 1);

     // compute the world position of the surface
    //vec3 surfaceWorldPosition = (u_world * a_position);
 
    // compute the vector of the surface to the light
    // and pass it to the fragment shader
    //v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
}

#endif
#ifdef FRAGMENT_SHADER
// ------------------------------------------------------//
// ----------------- Fragment SHADER --------------------//
// ------------------------------------------------------//

precision highp float; //float precision settings
uniform vec3 u_tint;            // the tint color of this object
uniform vec3 u_directionalLight;// directional light in world space
uniform vec3 u_directionalColor;// light color
uniform vec3 u_ambientColor;    // intensity of ambient light
varying vec3 v_normal;  // normal from the vertex shader

uniform vec3 u_lightDirection;
uniform float u_limit;
varying vec3 v_surfaceToLight;

//TODO: Add v_texcoord varying
varying vec2 v_texcoord;
//TODO: Add u_mainTex sampler (main texture)
uniform sampler2D u_mainTex;

void main(void){
    // calculate basic directional lighting
    vec3 normal = normalize(v_normal);
    float diffuse = max(0.0, dot(normal, -u_directionalLight));
    vec3 diffuseColor = u_directionalColor * diffuse;
    vec3 ambientDiffuse = u_ambientColor + diffuseColor;
    ambientDiffuse = clamp(ambientDiffuse, vec3(0.0,0.0,0.0), vec3(1.0,1.0,1.0));

    float light;
    float specular;
    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
    // float dotFromDirection = dot(surfaceToLightDirection, -u_lightDirection);
    // if (dotFromDirection >= u_limit) {
    //     light = dot(normal, surfaceToLightDirection);
    //     if (light > 0.0) {
    //         specular = pow(dot(normal, halfVector), u_shininess);
    //     }
    // }


    //TODO: Add texture color sampling
    
    vec4 textureColor = texture2D(u_mainTex, v_texcoord);

    //TODO: Blend texture color with tint color for new baseColor
    vec3 baseColor =  u_tint * textureColor.xyz;
    vec3 finalColor = ambientDiffuse * baseColor; // apply lighting to color

    gl_FragColor = vec4(finalColor, 1);
}

#endif
