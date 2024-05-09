#version 300 es 
precision highp float;

in vec3 vertexColor;

out vec4 fragColor;

void main(){
    vec4 grassColor = vec4(0.07, 0.43, 0.08, 1.0);

    fragColor.rgb = mix(vertexColor.rgb, grassColor.rgb, 0.55);
    fragColor.a = 1.0;
}