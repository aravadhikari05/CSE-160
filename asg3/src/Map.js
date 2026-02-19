const g_map = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,2],
  [2,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,2],
  [2,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,1,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,2],
  [2,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,3,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,2],
  [2,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

class WorldMap {
  constructor(mapData, textureNum, offsetX, offsetY, offsetZ) {
    this.mapData   = mapData;
    this.textureNum = textureNum !== undefined ? textureNum : 2;
    this.offsetX   = offsetX !== undefined ? offsetX : -16;
    this.offsetY   = offsetY !== undefined ? offsetY : -0.75;
    this.offsetZ   = offsetZ !== undefined ? offsetZ : -16;

    this.cubeVerts = [
      // front
      0,0,0, 0,1,0, 1,1,0,
      0,0,0, 1,1,0, 1,0,0,
      // top
      0,1,0, 0,1,1, 1,1,1,
      0,1,0, 1,1,1, 1,1,0,
      // bottom
      0,0,1, 0,0,0, 1,0,0,
      0,0,1, 1,0,0, 1,0,1,
      // left
      0,0,1, 0,1,1, 0,1,0,
      0,0,1, 0,1,0, 0,0,0,
      // right
      1,0,0, 1,1,0, 1,1,1,
      1,0,0, 1,1,1, 1,0,1,
      // back
      1,0,1, 1,1,1, 0,1,1,
      1,0,1, 0,1,1, 0,0,1,
    ];

    this.cubeUVs = [
      // front
      0,0, 0,1, 1,1,
      0,0, 1,1, 1,0,
      // top
      0,0, 0,1, 1,1,
      0,0, 1,1, 1,0,
      // bottom
      0,1, 0,0, 1,0,
      0,1, 1,0, 1,1,
      // left
      1,0, 1,1, 0,1,
      1,0, 0,1, 0,0,
      // right
      0,0, 0,1, 1,1,
      0,0, 1,1, 1,0,
      // back
      1,0, 1,1, 0,1,
      1,0, 0,1, 0,0,
    ];

    this.vertexCount = 0;
    this.vertexBuffer = gl.createBuffer();
    this.uvBuffer     = gl.createBuffer();

    this.buildBuffers();
  }

  buildBuffers() {
    const TREASURE = 9;

    let totalBlocks = 0;
    for (let x = 0; x < this.mapData.length; x++) {
      for (let z = 0; z < this.mapData[x].length; z++) {
        let h = this.mapData[x][z];
        if (h !== TREASURE) totalBlocks += h;
      }
    }

    let vData  = new Float32Array(totalBlocks * 36 * 3);
    let uvData = new Float32Array(totalBlocks * 36 * 2);
    let vi = 0, uvi = 0;

    for (let x = 0; x < this.mapData.length; x++) {
      for (let z = 0; z < this.mapData[x].length; z++) {
        let height = this.mapData[x][z];
        if (height === 0 || height === TREASURE) continue;

        for (let y = 0; y < height; y++) {
          let tx = x + this.offsetX;
          let ty = y + this.offsetY;
          let tz = z + this.offsetZ;

          for (let v = 0; v < 36; v++) {
            vData[vi++] = this.cubeVerts[v * 3 + 0] + tx;
            vData[vi++] = this.cubeVerts[v * 3 + 1] + ty;
            vData[vi++] = this.cubeVerts[v * 3 + 2] + tz;
            uvData[uvi++] = this.cubeUVs[v * 2 + 0];
            uvData[uvi++] = this.cubeUVs[v * 2 + 1];
          }
        }
      }
    }

    this.vertexCount = vi / 3;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vData, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvData, gl.STATIC_DRAW);
  }

  rebuild() {
    this.buildBuffers();
  }

  render() {
    gl.uniform1i(u_WhichTexture, this.textureNum);
    gl.uniform4f(u_FragColor, 1, 1, 1, 1);

    let identity = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identity.elements);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_UV);

    gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);
  }
}
