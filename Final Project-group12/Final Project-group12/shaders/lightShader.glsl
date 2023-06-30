#ifdef VERTEX_SHADER
// ------------------------------------------------------//
// ----------------- VERTEX SHADER ----------------------//
// ------------------------------------------------------//

attribute vec3 a_position; // the position of each vertex
// TODO: Create new attribute a_normal
attribute vec3 a_normal;
attribute vec2 a_texcoord;

uniform mat4 u_matrixM; // the model matrix of this object
uniform mat4 u_matrixV; // the view matrix of the camera
uniform mat4 u_matrixP; // the projection matrix of the camera

// inverse transpose to change normals into world space, this will make sure
// our normals are not stretched when the object is scaled.
uniform mat3 u_matrixInvTransM;

// TODO: create new varying v_normal
varying vec3 v_normal;
// TODO: (For specular) add view_pos uniform and v_surfaceToView varying
uniform vec3 u_viewPos;
varying vec3 v_surfaceToView;

varying vec2 v_texcoord;


void main() {
    // TODO: Set v_normal to have the value of a_normal. This means creating a
    // new output for the vertex shader or forwarding a value from the vertex shader
    // to the fragment shader.
    v_normal = u_matrixInvTransM * a_normal;

    v_texcoord = a_texcoord;

    // Remember to apply the Inverse Transpose matrix, to transform the normals to their
    // correct world coordinates!

    // TODO: (For specular) calculate world position of vertex to then calculate v_surfaceToView
    vec3 worldPosition = (u_matrixM* vec4(a_position, 1)).xyz;
    v_surfaceToView =u_viewPos - worldPosition;
    // calculate new position
    gl_Position = u_matrixP * u_matrixV * u_matrixM * vec4 (a_position, 1);
}

#endif
#ifdef FRAGMENT_SHADER
// ------------------------------------------------------//
// ----------------- Fragment SHADER --------------------//
// ------------------------------------------------------//

precision highp float; //float precision settings

uniform vec3 u_tint;            // the tint color of this object
// TODO: create new uniform for light color
uniform vec3 u_lightColor;
// TODO: create new uniform for light direction
uniform vec3 u_lightDirection;
uniform vec3 u_ambientColor;    // intensity of ambient light
uniform vec3 u_directionalLight;// directional light in world space
uniform vec3 u_directionalColor;// light color

// TODO: create new varying v_normal (to accept interpolated output from the vertex shader)
varying vec3 v_normal;
// TODO: (For specular) add v_surfaceToView and shininess uniform
uniform float u_shininess;
uniform vec3 u_viewPos;
varying vec3 v_surfaceToView;
varying vec2 v_texcoord;
uniform sampler2D u_mainTex;



void main(void){
    // TODO: normalize normal (not normalized because of interpolation over triangle)
    vec3 normal = normalize(v_normal);
    // TODO: normalize light direction (not normalized by default)
    vec3 lightDirection = normalize(u_lightDirection);
    // TODO: calculate diffuse term
    float diffuse = max(0.0, dot(normal, -u_directionalLight));
    // TODO: calculate specular term
    float ambient = 0.1;
    // TODO: blend surface(tint) color with light color
    vec3 diffuseColor = u_directionalColor * diffuse;
    vec3 ambientDiffuse = u_ambientColor + diffuseColor;
    ambientDiffuse = clamp(ambientDiffuse, vec3(0.0,0.0,0.0), vec3(1.0,1.0,1.0));


    vec3 V = normalize(v_surfaceToView);
    vec3 H = normalize(-lightDirection + V);
    float specularMax = max(0.0, dot(H, normal));
    float specular = pow(specularMax, 20.0);
    // TODO: apply diffuse, specular and ambient terms. Add 0.1 for ambient term.
    vec4 textureColor = texture2D(u_mainTex, v_texcoord);
    //vec3 result = u_tint * u_lightColor * (diffuse + specular + ambient); // for now this shader uses the tint color so you can see something
    vec3 baseColor =  u_tint * textureColor.xyz * u_lightColor * (diffuse + specular + ambient);
    vec3 finalColor = ambientDiffuse * baseColor;
    gl_FragColor = vec4(finalColor, 1);
}

#endif