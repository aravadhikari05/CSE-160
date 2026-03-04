class Sphere {
  constructor() {
    this.type = 'sphere';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureNum = 0;

    const vertices = [];
    const uvs = [];
    const normals = [];

    const d = Math.PI / 10;
    const dd = Math.PI / 10;

    for (let t = 0; t < Math.PI; t += d) {
      for (let r = 0; r < (2 * Math.PI); r += d) {
        const t2 = t + dd;
        const r2 = r + dd;

        const p1 = [Math.sin(t) * Math.cos(r), Math.sin(t) * Math.sin(r), Math.cos(t)];
        const p2 = [Math.sin(t2) * Math.cos(r), Math.sin(t2) * Math.sin(r), Math.cos(t2)];
        const p3 = [Math.sin(t) * Math.cos(r2), Math.sin(t) * Math.sin(r2), Math.cos(t)];
        const p4 = [Math.sin(t2) * Math.cos(r2), Math.sin(t2) * Math.sin(r2), Math.cos(t2)];

        const u1 = r / (2 * Math.PI);
        const u2 = r2 / (2 * Math.PI);
        const v1 = t / Math.PI;
        const v2 = t2 / Math.PI;

        vertices.push(...p1, ...p2, ...p4);
        normals.push(...p1, ...p2, ...p4); 
        uvs.push(u1, v1,  u1, v2,  u2, v2);

        vertices.push(...p1, ...p4, ...p3);
        normals.push(...p1, ...p4, ...p3);
        uvs.push(u1, v1,  u2, v2,  u2, v1);
      }
    }

    this.vertices = new Float32Array(vertices);
    this.uvs = new Float32Array(uvs);
    this.normals = new Float32Array(normals);

    this.numVerts = this.vertices.length / 3;

    this.vertexBuffer = gl.createBuffer();
    this.uvBuffer = gl.createBuffer();
    this.normalBuffer = gl.createBuffer();
  }

  clone() {
    let clone = new Sphere();
    clone.color = [...this.color];
    clone.matrix = new Matrix4(this.matrix);
    clone.textureNum = this.textureNum;
    return clone;
  }

  render() {
    var rgba = this.color;

    gl.uniform1i(u_WhichTexture, this.textureNum);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    var normalMatrix = new Matrix4();
    normalMatrix.setInverseOf(this.matrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

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

    //normal buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Normal);

    gl.drawArrays(gl.TRIANGLES, 0, this.numVerts);
  }
}
