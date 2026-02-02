function showDrawing() {
  document.getElementById("reference").style.display = "inline";

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  //Background
  gl.uniform4f(u_FragColor, 0, 0.78, 0, 1.0);
  drawTriangle([-0.98, -0.98, 0.98, -0.98, 0.98, -0.20]);
  drawTriangle([-0.98, -0.98, 0.98, -0.20, -0.98, -0.20]);

  gl.uniform4f(u_FragColor, 0.18, 0.22, 0.47, 1.0);
  drawTriangle([0.98, 0.98, -0.98, 0.98, -0.98, -0.20]);
  drawTriangle([0.98, 0.98, -0.98, -0.20, 0.98, -0.20]);

  // House body
  gl.uniform4f(u_FragColor, 0.94, 0.89, 0.47, 1.0);
  drawTriangle([-0.30, -0.60, 0.30, -0.60, 0.30, 0.00]);
  drawTriangle([-0.30, -0.60, 0.30, 0.00, -0.30, 0.00]);

  // Chimney
  gl.uniform4f(u_FragColor, 0.65, 0.16, 0.16, 1.0);
  drawTriangle([-0.30, 0.10, -0.15, 0.26, -0.30, 0.26]);

  // Roof
  gl.uniform4f(u_FragColor, 0.6, 0.3, 0.0, 1.0);
  drawTriangle([-0.40, 0.00, 0.40,  0.00, 0.00, 0.42]);
  gl.uniform4f(u_FragColor, 0.94, 0.89, 0.47, 1.0);
  drawTriangle([-0.30, 0.00, 0.30, 0.00, 0.00, 0.32]);

  // Smoke
  gl.uniform4f(u_FragColor, 0.5, 0.5, 0.5, 1.0);
  drawTriangle([-0.243, 0.290, -0.165, 0.311, -0.222, 0.368]);
  drawTriangle([-0.284, 0.391, -0.207, 0.371, -0.229, 0.441]);
  drawTriangle([-0.26, 0.45, -0.18, 0.45, -0.22, 0.52]);

  // Windows
  gl.uniform4f(u_FragColor, 0.09, 0.50, 0.59, 1.0);
  drawTriangle([-0.20, -0.28, -0.08, -0.28, -0.08, -0.16]);
  drawTriangle([-0.20, -0.28, -0.08, -0.16, -0.20, -0.16]);

  drawTriangle([ 0.08, -0.28, 0.20, -0.28, 0.20, -0.16]);
  drawTriangle([ 0.08, -0.28, 0.20, -0.16, 0.08, -0.16]);
  
  // Tree trunks
  gl.uniform4f(u_FragColor, 0.6, 0.3, 0.0, 1.0);
  drawTriangle([-0.78, -0.60, -0.70, -0.60, -0.70, -0.42]);
  drawTriangle([-0.78, -0.60, -0.70, -0.42, -0.78, -0.42]);

  drawTriangle([ 0.70, -0.60, 0.78, -0.60, 0.78, -0.42]);
  drawTriangle([ 0.70, -0.60, 0.78, -0.42, 0.70, -0.42]);

  // Door
  drawTriangle([-0.07, -0.60, 0.07, -0.60, 0.07, -0.35]);
  drawTriangle([-0.07, -0.60, 0.07, -0.35, -0.07, -0.35]);

  //Tree leaves
  gl.uniform4f(u_FragColor, 0.0, 0.28, 0.0, 1.0);
  drawTriangle([-0.84, -0.42, -0.64, -0.42, -0.74, -0.20]);
  drawTriangle([-0.82, -0.28, -0.66, -0.28, -0.74, -0.06]);

  drawTriangle([ 0.64, -0.42, 0.84, -0.42, 0.74, -0.20]);
  drawTriangle([ 0.66, -0.28, 0.82, -0.28, 0.74, -0.06]);

  //Initials
  gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);

  drawTriangle([-0.28, -0.82, -0.26, -0.82, -0.22, -0.70]);
  drawTriangle([-0.18, -0.82, -0.16, -0.82, -0.22, -0.70]);
  drawTriangle([-0.24, -0.76, -0.20, -0.76, -0.22, -0.74]);

  drawTriangle([-0.18, -0.82, -0.16, -0.82, -0.12, -0.70]);
  drawTriangle([-0.08, -0.82, -0.06, -0.82, -0.12, -0.70]);
  drawTriangle([-0.14, -0.76, -0.10, -0.76, -0.12, -0.74]);

}