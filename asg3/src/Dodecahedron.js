class Dodecahedron {
  constructor() {
    this.type = 'dodecahedron';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
  }
  
  clone() {
    let clone = new Dodecahedron();
    clone.color = [...this.color];
    clone.matrix = new Matrix4(this.matrix);
    return clone;
  }
  
  render() {
    var rgba = this.color;
    
    // Golden ratio for dodecahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const invPhi = 1 / phi;
    
    // Normalize to fit in unit cube (scale factor)
    const scale = 0.5 / phi;
    
    // 20 vertices of a dodecahedron (normalized to approximately -0.5 to 0.5 range, then shifted to 0-1)
    const s = scale;
    const offset = 0.5;
    
    // Helper to shift vertices to 0-1 range
    const v = (x, y, z) => [x * s + offset, y * s + offset, z * s + offset];
    
    // The 20 vertices
    const v0 = v(1, 1, 1);
    const v1 = v(1, 1, -1);
    const v2 = v(1, -1, 1);
    const v3 = v(1, -1, -1);
    const v4 = v(-1, 1, 1);
    const v5 = v(-1, 1, -1);
    const v6 = v(-1, -1, 1);
    const v7 = v(-1, -1, -1);
    const v8 = v(0, invPhi, phi);
    const v9 = v(0, invPhi, -phi);
    const v10 = v(0, -invPhi, phi);
    const v11 = v(0, -invPhi, -phi);
    const v12 = v(invPhi, phi, 0);
    const v13 = v(invPhi, -phi, 0);
    const v14 = v(-invPhi, phi, 0);
    const v15 = v(-invPhi, -phi, 0);
    const v16 = v(phi, 0, invPhi);
    const v17 = v(phi, 0, -invPhi);
    const v18 = v(-phi, 0, invPhi);
    const v19 = v(-phi, 0, -invPhi);
    
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    
    // Face 1
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    drawTriangle3D([...v0, ...v8, ...v10]);
    drawTriangle3D([...v0, ...v10, ...v2]);
    drawTriangle3D([...v0, ...v2, ...v16]);
    
    // Face 2
    gl.uniform4f(u_FragColor, 0.95 * rgba[0], 0.95 * rgba[1], 0.95 * rgba[2], rgba[3]);
    drawTriangle3D([...v0, ...v16, ...v17]);
    drawTriangle3D([...v0, ...v17, ...v1]);
    drawTriangle3D([...v0, ...v1, ...v12]);
    
    // Face 3
    gl.uniform4f(u_FragColor, 0.9 * rgba[0], 0.9 * rgba[1], 0.9 * rgba[2], rgba[3]);
    drawTriangle3D([...v0, ...v12, ...v14]);
    drawTriangle3D([...v0, ...v14, ...v4]);
    drawTriangle3D([...v0, ...v4, ...v8]);
    
    // Face 4
    gl.uniform4f(u_FragColor, 0.85 * rgba[0], 0.85 * rgba[1], 0.85 * rgba[2], rgba[3]);
    drawTriangle3D([...v8, ...v4, ...v18]);
    drawTriangle3D([...v8, ...v18, ...v6]);
    drawTriangle3D([...v8, ...v6, ...v10]);
    
    // Face 5
    gl.uniform4f(u_FragColor, 0.8 * rgba[0], 0.8 * rgba[1], 0.8 * rgba[2], rgba[3]);
    drawTriangle3D([...v10, ...v6, ...v15]);
    drawTriangle3D([...v10, ...v15, ...v13]);
    drawTriangle3D([...v10, ...v13, ...v2]);
    
    // Face 6
    gl.uniform4f(u_FragColor, 0.75 * rgba[0], 0.75 * rgba[1], 0.75 * rgba[2], rgba[3]);
    drawTriangle3D([...v2, ...v13, ...v3]);
    drawTriangle3D([...v2, ...v3, ...v17]);
    drawTriangle3D([...v2, ...v17, ...v16]);
    
    // Face 7
    gl.uniform4f(u_FragColor, 0.7 * rgba[0], 0.7 * rgba[1], 0.7 * rgba[2], rgba[3]);
    drawTriangle3D([...v7, ...v11, ...v9]);
    drawTriangle3D([...v7, ...v9, ...v5]);
    drawTriangle3D([...v7, ...v5, ...v19]);
    
    // Face 8
    gl.uniform4f(u_FragColor, 0.65 * rgba[0], 0.65 * rgba[1], 0.65 * rgba[2], rgba[3]);
    drawTriangle3D([...v7, ...v19, ...v18]);
    drawTriangle3D([...v7, ...v18, ...v6]);
    drawTriangle3D([...v7, ...v6, ...v15]);
    
    // Face 9
    gl.uniform4f(u_FragColor, 0.6 * rgba[0], 0.6 * rgba[1], 0.6 * rgba[2], rgba[3]);
    drawTriangle3D([...v7, ...v15, ...v13]);
    drawTriangle3D([...v7, ...v13, ...v3]);
    drawTriangle3D([...v7, ...v3, ...v11]);
    
    // Face 10
    gl.uniform4f(u_FragColor, 0.55 * rgba[0], 0.55 * rgba[1], 0.55 * rgba[2], rgba[3]);
    drawTriangle3D([...v9, ...v11, ...v3]);
    drawTriangle3D([...v9, ...v3, ...v17]);
    drawTriangle3D([...v9, ...v17, ...v1]);
    
    // Face 11
    gl.uniform4f(u_FragColor, 0.5 * rgba[0], 0.5 * rgba[1], 0.5 * rgba[2], rgba[3]);
    drawTriangle3D([...v9, ...v1, ...v12]);
    drawTriangle3D([...v9, ...v12, ...v5]);
    drawTriangle3D([...v9, ...v5, ...v11]);
    
    // Face 12
    gl.uniform4f(u_FragColor, 0.45 * rgba[0], 0.45 * rgba[1], 0.45 * rgba[2], rgba[3]);
    drawTriangle3D([...v5, ...v12, ...v14]);
    drawTriangle3D([...v5, ...v14, ...v4]);
    drawTriangle3D([...v5, ...v4, ...v18]);
    drawTriangle3D([...v5, ...v18, ...v19]);
  }
}