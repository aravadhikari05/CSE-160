// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  }`;

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`;

//global variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;


function setupWebGL() {
  canvas = document.getElementById('webgl');

  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}


//UI globals
let g_hipAngle = 0;
let g_kneeAngle = 0;
let g_ankleAngle = 0;
let g_tailAngle = 0;

let g_hipAnimation = false;
let g_kneeAnimation = false
let g_ankleAnimation = false;
let g_tailAnimation = false;

let g_isDragging = false;
let g_lastMouseX = 0;
let g_lastMouseY = 0;
let g_cameraAngleX = 0;
let g_cameraAngleY = 0;

function addActionsForHtmlUI() {

  document.getElementById('cameraSlide').addEventListener('mousemove', function() {g_cameraAngleY = this.value; renderScene(); });

  document.getElementById('hipSlide').addEventListener('mousemove', function() {g_hipAngle= this.value; renderScene(); });
  document.getElementById('kneeSlide').addEventListener('mousemove', function() {g_kneeAngle= this.value; renderScene(); });
  document.getElementById('ankleSlide').addEventListener('mousemove', function() {g_ankleAngle= this.value; renderScene(); });

  document.getElementById('hipAnimationOnButton').onclick = function() {g_hipAnimation = true};
  document.getElementById('hipAnimationOffButton').onclick = function() {g_hipAnimation = false};

  document.getElementById('kneeAnimationOnButton').onclick = function() {g_kneeAnimation = true};
  document.getElementById('kneeAnimationOffButton').onclick = function() {g_kneeAnimation = false};

  document.getElementById('ankleAnimationOnButton').onclick = function() {g_ankleAnimation = true};
  document.getElementById('ankleAnimationOffButton').onclick = function() {g_ankleAnimation = false};

}

function main() {

  setupWebGL();

  connectVariablesToGLSL();

  addActionsForHtmlUI();

  registerMouseEvents();

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  requestAnimationFrame(tick);
}

function registerMouseEvents() {
  canvas.onmousedown = function(ev) {
    if (ev.shiftKey) {
      g_tailAnimation = !g_tailAnimation;
    } else {
      g_isDragging = true;
      g_lastMouseX = ev.clientX;
      g_lastMouseY = ev.clientY;
    }
  };

  canvas.onmousemove = function(ev) {
    if (g_isDragging) {
      let deltaX = ev.clientX - g_lastMouseX;
      let deltaY = ev.clientY - g_lastMouseY;
      
      g_cameraAngleY += deltaX * 0.5;
      g_cameraAngleX += deltaY * 0.5;
      
      g_lastMouseX = ev.clientX;
      g_lastMouseY = ev.clientY;
    }
  };

  canvas.onmouseup = function(ev) {
    g_isDragging = false;
  };
}

function convertCoodinateEventsToGL(ev){
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}

function buildThigh(bodyCoordinates, hipX, hipY, hipZ, hipAngle) {
  let thigh = new Cube();
  thigh.color = [0.93, 0.84, 0.60, 1.0];
  thigh.matrix = new Matrix4(bodyCoordinates);
  thigh.matrix.translate(hipX, hipY, hipZ);
  thigh.matrix.rotate(hipAngle, 1,0,0);
  
  let jointMatrix = new Matrix4(thigh.matrix);

  thigh.matrix.scale(0.125, -0.2, 0.125);
  thigh.render();

  return jointMatrix;
}

function buildCalf(thighJoint, kneeAngle) {
  let calf = new Cube();
  calf.color = [0.84, 0.76, 0.54, 1.0];
  calf.matrix = new Matrix4(thighJoint);
  calf.matrix.translate(0.01, -0.12, 0.01);
  calf.matrix.rotate(kneeAngle, 1,0,0);

  let jointMatrix = new Matrix4(calf.matrix);

  calf.matrix.scale(0.11, -0.16, 0.11);
  calf.render();

  return jointMatrix;
}

function buildFoot(kneeJoint, ankleAngle) {
  let foot = new Cube();
  foot.color = [0.75, 0.68, 0.48, 1.0];
  foot.matrix = new Matrix4(kneeJoint);
  foot.matrix.translate(0.02, -0.13, 0.01);
  foot.matrix.rotate(ankleAngle, 1,0,0);

  let jointMatrix = new Matrix4(foot.matrix);

  foot.matrix.scale(0.08, -0.08, 0.08);
  foot.render();

  return jointMatrix;
}

function renderScene() {
  var startTime = performance.now();

  var globalRotMat = new Matrix4();
  globalRotMat.rotate(-g_cameraAngleY, 0, 1, 0);
  globalRotMat.rotate(g_cameraAngleX, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var body = new Cube();
  body.color = [0.76, 0.55, 0.33, 1.0];
  body.matrix.translate(-0.25, -0.25, -0.50);
  body.matrix.rotate(7.5, 1, 0, 0)
  var bodyCoordinates = new Matrix4(body.matrix);
  body.matrix.scale(0.5, 0.5, 1.0);
  body.render();

  let backRightThigh = buildThigh(bodyCoordinates,  0.35, 0.1, 0.1, g_hipAngle);
  let backLeftThigh = buildThigh(bodyCoordinates, 0.02, 0.1, 0.1, g_hipAngle);
  let frontRightThigh = buildThigh(bodyCoordinates,  0.35, 0.1, 0.85, g_hipAngle);
  let frontLeftThigh = buildThigh(bodyCoordinates, 0.02, 0.1, 0.85, g_hipAngle);

  let backRightCalf = buildCalf(backRightThigh, g_kneeAngle);
  let backLeftCalf = buildCalf(backLeftThigh, g_kneeAngle);
  let frontRightCalf = buildCalf(frontRightThigh, g_kneeAngle);
  let frontLeftCalf = buildCalf(frontLeftThigh, g_kneeAngle);

  let backRightFoot = buildFoot(backRightCalf, g_ankleAngle);
  let backLeftFoot = buildFoot(backLeftCalf, g_ankleAngle);
  let frontRightFoot = buildFoot(frontRightCalf, g_ankleAngle);
  let frontLeftFoot = buildFoot(frontLeftCalf, g_ankleAngle);

  var mane = new Dodecahedron();
  mane.color = [0.40, 0.26, 0.13, 1.0];
  mane.matrix = new Matrix4(bodyCoordinates);
  mane.matrix.translate(-0.08, 0, 0.95);
  maneCoordinates = new Matrix4(mane.matrix);
  mane.matrix.rotate(35, 0, 1, 0);
  mane.matrix.scale(0.47, 0.47, 0.47);
  mane.render();
  
  var head = new Cube();
  head.color = [0.93, 0.84, 0.60, 1.0];
  head.matrix = new Matrix4(maneCoordinates);
  head.matrix.translate(0.19, 0.07, -0.01);
  head.matrix.scale(0.28, 0.28, 0.28);
  head.render();

  var tail = new Cube();
  tail.color = [0.76, 0.55, 0.33, 1.0];
  tail.matrix = new Matrix4(bodyCoordinates);
  tail.matrix.translate(0.2, 0.25, 0.20);
  tail.matrix.rotate(-30 + g_tailAngle, 1, 0, 0);
  tailCoordinates = new Matrix4(tail.matrix);
  tail.matrix.scale(0.1, 0.1, -0.5);
  tail.render();

  var tuft = new Cube();
  tuft.color = [0.40, 0.26, 0.13, 1.0];
  tuft.matrix = new Matrix4(tailCoordinates);
  tuft.matrix.translate(-0.01, -0.01, -0.4);
  tuft.matrix.scale(0.12, 0.12, -0.12);
  tuft.render();
  

  var duration = performance.now() - startTime;
  var fps = Math.floor(1000 / duration);

  var fpsDisplay = document.getElementById('fps');
  if (fpsDisplay) {
    fpsDisplay.textContent = 'FPS: ' + fps;
  }
  //console.log("Num dots: " + len + ", ms: " +  Math.floor(duration) + ", fps: ", Math.floor(10000/duration));
}

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

function tick() {
  g_seconds = performance.now()/1000.0 - g_startTime;

  updateAnimationAngles();

  renderScene();

  requestAnimationFrame(tick);
}

function updateAnimationAngles() {

  if (g_hipAnimation) {
    g_hipAngle = 45 * Math.sin(g_seconds);
  }

  if (g_kneeAnimation) {
    g_kneeAngle = 45 * Math.sin(g_seconds);
  } 

  if (g_ankleAnimation) {
    g_ankleAngle = 45 * Math.sin(g_seconds);
  } 

  if (g_tailAnimation) {
    g_tailAngle = 30 * Math.sin(3 * g_seconds);
  }

}



