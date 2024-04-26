import { CGFappearance } from "../lib/CGF.js";

/**
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
 * 
 * @param {number[]} direction it's assumed that it's unitary
 * @param {number[]} point 
 * @param {number} scalar
 * @returns {number[]} 
 */
export function applyScalarToPointInDirection(direction, point, scalar){
    return [point[0] + direction[0]*scalar, point[1] + direction[1]*scalar, point[2] + direction[2]*scalar]
}

/**
 * 
 * @param {number[]} vertexList 
 * @param {number[]} vertex 
 * @param {number} pos 
 */
export function changeVertex(vertexList, vertex, pos){
    vertexList[pos*3] = vertex[0]
    vertexList[pos*3 + 1] = vertex[1]
    vertexList[pos*3 + 2] = vertex[2]
}