class Cube {
  constructor() {
    this.type = 'cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureNum = 0;

    this.vertices = new Float32Array([
      // front
      0,0,0,  0,1,0,  1,1,0,
      0,0,0,  1,1,0,  1,0,0,
      // top
      0,1,0,  0,1,1,  1,1,1,
      0,1,0,  1,1,1,  1,1,0,
      // bottom
      0,0,1,  0,0,0,  1,0,0,
      0,0,1,  1,0,0,  1,0,1,
      // left
      0,0,1,  0,1,1,  0,1,0,
      0,0,1,  0,1,0,  0,0,0,
      // right
      1,0,0,  1,1,0,  1,1,1,
      1,0,0,  1,1,1,  1,0,1,
      // back
      1,0,1,  1,1,1,  0,1,1,
      1,0,1,  0,1,1,  0,0,1,
    ]);

    this.uvs = new Float32Array([
      // front
      0,0,  0,1,  1,1,
      0,0,  1,1,  1,0,
      // top
      0,0,  0,1,  1,1,
      0,0,  1,1,  1,0,
      // bottom
      0,1,  0,0,  1,0,
      0,1,  1,0,  1,1,
      // left
      1,0,  1,1,  0,1,
      1,0,  0,1,  0,0,
      // right
      0,0,  0,1,  1,1,
      0,0,  1,1,  1,0,
      // back
      1,0,  1,1,  0,1,
      1,0,  0,1,  0,0,
    ]);

    this.vertexBuffer = gl.createBuffer();
    this.uvBuffer = gl.createBuffer();
  }

  clone() {
    let clone = new Cube();
    clone.color = [...this.color];
    clone.matrix = new Matrix4(this.matrix);
    return clone;
  }

  render() {
    var rgba = this.color;

    gl.uniform1i(u_WhichTexture, this.textureNum);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    // uv buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_UV);

    gl.drawArrays(gl.TRIANGLES, 0, 36);
  }
}
