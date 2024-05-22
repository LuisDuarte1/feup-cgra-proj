import { CGFappearance } from "../lib/CGF.js";

/**
 * Function that sets the color of an appearance to the given RGB values
 * @param {CGFappearance} appearance
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 */
export function setColorRGB(appearance,r, g, b){
    const r_div =  r / 255;
    const g_div =  g / 255;
    const b_div =  b / 255;
    appearance.setAmbient(r_div, g_div, b_div, 1.0);
    appearance.setDiffuse(r_div, g_div, b_div, 1.0);
    appearance.setSpecular(r_div, g_div, b_div, 1.0);
}

/**
 * Function that applies a scalar to a point in a given direction
 * @param {number[]} direction it's assumed that it's unitary
 * @param {number[]} point 
 * @param {number} scalar
 * @returns {number[]} 
 */
export function applyScalarToPointInDirection(direction, point, scalar){
    return [point[0] + direction[0]*scalar, point[1] + direction[1]*scalar, point[2] + direction[2]*scalar]
}

/**
 * Function that changes the vertex in the vertexList at the given position
 * @param {number[]} vertexList 
 * @param {number[]} vertex 
 * @param {number} pos 
 */
export function changeVertex(vertexList, vertex, pos){
    vertexList[pos*3] = vertex[0]
    vertexList[pos*3 + 1] = vertex[1]
    vertexList[pos*3 + 2] = vertex[2]
}

/**
 * 
 * @param {number[]} a 
 * @param {number[]} b 
 * @returns {number}
 */
export function vec3Distance(a,b){
    return Math.sqrt(
        Math.pow(a[0]-b[0], 2) +
        Math.pow(a[1]-b[1], 2) +
        Math.pow(a[2]-b[2], 2)
    )
}

/**
 * 
 * @param {number[]} a 
 * @returns {number}
 */
export function vec3Magnitude(a){
    return Math.sqrt(a[0]*a[0] + a[1]*a[1] * a[2]*a[2])
}