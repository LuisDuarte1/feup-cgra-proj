#version 300 es 
precision highp float;

in vec3 aVertexPosition;
in vec3 aColor;

out vec3 vertexColor;


uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uTime;

void main(){
    vec3 cpos = aVertexPosition;
    vertexColor = aColor;

    float waveSize = 10.0f;   
    float tipDistance = 0.3f;
    float centerDistance = 0.1f;

    vec4 initalWorldPos = uMVMatrix * vec4(aVertexPosition, 1.0);

    if (aColor.x > 0.6f) {
        cpos.x += sin((uTime / 500.0) * 10.0) * tipDistance;
    }else if (aColor.x > 0.0f) {
        cpos.x += sin((uTime / 500.0) * 10.0) * centerDistance;
    }

    vec4 mvPosition = uPMatrix * uMVMatrix * vec4(cpos, 1.0);
    gl_Position = mvPosition;

}

