class Triangle {
  constructor(){
    this.type = 'triangle';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
    this.rotate = 0;
  }

  render() {
  const xy = this.position;
  const rgba = this.color;
  const size = this.size;
  const angle = -this.rotate * Math.PI / 180;

// Pass the color of a point to u_FragColor variable
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

  //Draw
  const d = size / 200.0; //delta

  let v1 = [xy[0], xy[1]];
  let v2 = [xy[0] + d/2, xy[1] + d];
  let v3 = [xy[0] + d, xy[1]];

  const cx = (v1[0] + v2[0] + v3[0]) / 3;
  const cy = (v1[1] + v2[1] + v3[1]) / 3;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  function rotate(v) {
    const x = v[0] - cx;
    const y = v[1] - cy;

    return [ cx + x * cos - y * sin, cy + x * sin + y * cos ];
  }

  v1 = rotate(v1);
  v2 = rotate(v2);
  v3 = rotate(v3);

  drawTriangle([
    v1[0], v1[1],
    v2[0], v2[1],
    v3[0], v3[1]
  ]);
}

}

function drawTriangle(vertices) {
//  var vertices = new Float32Array([
//      0, 0.5,  -0.5, -0.5,   0.5, -0.5
//  ]);

  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);

  //return n;
}

function drawTriangle3D(vertices) {
//  var vertices = new Float32Array([
//      0, 0.5,  -0.5, -0.5,   0.5, -0.5
//  ]);

  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);

  //return n;
}

function drawTriangle3DUV(vertices, uv) {
//  var vertices = new Float32Array([
//      0, 0.5,  -0.5, -0.5,   0.5, -0.5
//  ]);

  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);


  var uvBuffer = gl.createBuffer();
  if (!uvBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_UV);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}
