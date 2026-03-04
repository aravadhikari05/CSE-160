// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  attribute vec3 a_Normal;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_NormalMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
    v_Normal = normalize(vec3(u_NormalMatrix * vec4(a_Normal,1)));
    v_VertPos = u_ModelMatrix * a_Position;
  }`;

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform int u_WhichTexture;
  uniform vec3 u_LightPos;
  uniform vec3 u_CameraPos;
  uniform bool u_Specular;
  uniform bool u_ShowNormals;
  uniform bool u_LightOn;
  varying vec4 v_VertPos;
  void main() {
    if (u_WhichTexture == -3) {
      vec3 n = normalize(v_Normal);
      gl_FragColor = vec4(n * 0.5 + 0.5, 1.0);
    } else if (u_WhichTexture == -2) {
      gl_FragColor = u_FragColor;
    } else if (u_WhichTexture == -1) {
      gl_FragColor = vec4(v_UV, 1.0, 1.0);
    } else if (u_WhichTexture == 0) {
      gl_FragColor = texture2D(u_Sampler0, v_UV);
    } else if (u_WhichTexture == 1) {
      gl_FragColor = texture2D(u_Sampler1, v_UV);
    } else if (u_WhichTexture == 2) {
      gl_FragColor = texture2D(u_Sampler2, v_UV);
    } else {
      gl_FragColor = vec4(1,.2,.2,1);
    }

    vec3 lightVector = u_LightPos - vec3(v_VertPos);
    float r = length(lightVector);

    // Red/Green Distance Visualization
    // if (r < 1.0) {
    //   gl_FragColor = vec4(1,0,0,1);
    // } else if (r < 2.0) {
    //   gl_FragColor = vec4(0,1,0,1);
    // }

    // Light Falloff Visualization 1/r^2
    // gl_FragColor = vec4(vec3(gl_FragColor)/(r*r),1);

    // N dot L
    vec3 L = normalize(lightVector);
    vec3 N = normalize(v_Normal);
    float nDotL = max(dot(N, L), 0.0);

    // Reflection
    vec3 R = reflect(-L, N);

    // Eye
    vec3 E = normalize(u_CameraPos-vec3(v_VertPos));

    //Specular
    float specular = u_Specular ? pow(max(dot(E,R), 0.0), 10.0) : 0.0;

    if (u_LightOn) {
      vec3 diffuse = vec3(gl_FragColor) * nDotL * 0.7;
      vec3 ambient = vec3(gl_FragColor) * 0.3;
      gl_FragColor = vec4(specular + diffuse + ambient, 1.0);
    }

    if (u_ShowNormals) {
      gl_FragColor = vec4(normalize(v_Normal) * 0.5 + 0.5, 1.0);
    }
  }`;

//global variables
let canvas;
let gl;
let a_Position;
let a_UV;
let a_Normal;
let u_FragColor;
let u_LightPos;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_ViewMatrix;
let u_ProjectionMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_WhichTexture;
let u_CameraPos;
let u_NormalMatrix;
let u_Specular;
let u_ShowNormals;
let u_LightOn;
let g_lightOn = true;

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

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  if (a_Normal < 0) {
    console.log('Failed to get the storage location of a_Normal');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_LightPos = gl.getUniformLocation(gl.program, 'u_LightPos');
  if (!u_LightPos) {
    console.log('Failed to get the storage location of u_LightPos');
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

  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }
  
  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if (!u_Sampler2) {
    console.log('Failed to get the storage location of u_Sampler2');
    return false;
  }

  u_WhichTexture = gl.getUniformLocation(gl.program, 'u_WhichTexture');
  if (!u_WhichTexture) {
    console.log('Failed to get the storage location of u_WhichTexture');
    return false;
  }

  u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  if (!u_NormalMatrix) {
    console.log('Failed to get the storage location of u_NormalMatrix');
    return false;
  }

  u_Specular = gl.getUniformLocation(gl.program, 'u_Specular');
  if (!u_Specular) {
    console.log('Failed to get the storage location of u_Specular');
    return false;
  }

  u_ShowNormals = gl.getUniformLocation(gl.program, 'u_ShowNormals');
  if (!u_ShowNormals) {
    console.log('Failed to get the storage location of u_ShowNormals');
    return false;
  }

  u_LightOn = gl.getUniformLocation(gl.program, 'u_LightOn');
  if (!u_LightOn) {
    console.log('Failed to get the storage location of u_LightOn');
    return false;
  }

  u_CameraPos = gl.getUniformLocation(gl.program, 'u_CameraPos');
  if (!u_CameraPos) {
    console.log('Failed to get the storage location of u_CameraPos');
    return false;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}


//UI globals

let g_isDragging = false;
let g_lastMouseX = 0;
let g_lastMouseY = 0;
let g_cameraAngleX = 0;
let g_cameraAngleY = 0;

let g_camera;
let g_worldMap;
let g_bunny = null;

const TREASURE_VAL = 9;
let g_treasureTotal = 0;
let g_treasureFound = 0;
let g_gameWon = false;

const ground_y = 0;
const gravity  = 0.008; 
const jump_vel = 0.15; 
let g_velY = 0;
let g_onGround = true;

let g_normalOn = false;
let g_lightPos = [0,1,-2];



function addActionsForHtmlUI() {
  document.getElementById("normal-on").onclick  = function() { g_normalOn = true; };
  document.getElementById("normal-off").onclick = function() { g_normalOn = false; };
  document.getElementById("light-on").onclick   = function() { g_lightOn = true; };
  document.getElementById("light-off").onclick  = function() { g_lightOn = false; };

  document.getElementById("lightSlideX").addEventListener("mousemove", function(ev) {if(ev.buttons==1) {g_lightPos[0] = this.value/100; renderScene();}});
  document.getElementById("lightSlideY").addEventListener("mousemove", function(ev) {if(ev.buttons==1) {g_lightPos[1] = this.value/100; renderScene();}});
  document.getElementById("lightSlideZ").addEventListener("mousemove", function(ev) {if(ev.buttons==1) {g_lightPos[2] = this.value/100; renderScene();}});


}


function initTextures() {
  var sky = new Image();
  sky.onload = function() { sendTextureToGLSL(sky, 0, u_Sampler0); };
  sky.src = 'sky.png';

  var ground = new Image();
  ground.onload = function() { sendTextureToGLSL(ground, 1, u_Sampler1); };
  ground.src = 'ground.jpg';

  var wall = new Image();
  wall.onload = function() { sendTextureToGLSL(wall, 2, u_Sampler2); };
  wall.src = 'wall.png';

  return true;
}

function sendTextureToGLSL(image, texUnit, sampler) {
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE0 + texUnit);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.uniform1i(sampler, texUnit);

  console.log('finished loading texture ' + texUnit);
}



function main() {

  setupWebGL();

  connectVariablesToGLSL();

  addActionsForHtmlUI();

  g_camera = new Camera();
  g_worldMap = new WorldMap(g_map);

  g_bunny = new Model(gl, 'bunny.obj');
  g_bunny.color = [0.8, 0.75, 0.7, 1.0];

  // count treasures
  for (let x = 0; x < g_map.length; x++) 
    for (let z = 0; z < g_map[x].length; z++)
      if (g_map[x][z] === TREASURE_VAL) g_treasureTotal++;
  document.getElementById('treasure-total').textContent = g_treasureTotal;



  initTextures(gl, 0);

  registerMouseEvents();

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  requestAnimationFrame(tick);
}

function getTargetCell() {
  let eye = g_camera.eye.elements;
  let at  = g_camera.at.elements;

  let fx = at[0] - eye[0];
  let fz = at[2] - eye[2];
  let len = Math.sqrt(fx * fx + fz * fz);
  fx /= len;
  fz /= len;

  let tx = eye[0] + fx * 1.5;
  let tz = eye[2] + fz * 1.5;

  let mx = Math.floor(tx - g_worldMap.offsetX);
  let mz = Math.floor(tz - g_worldMap.offsetZ);

  if (mx < 0 || mz < 0 || mx >= g_map.length || mz >= g_map[0].length) return null;
  return { x: mx, z: mz };
}

function addBlock() {
  let cell = getTargetCell();
  if (!cell) return;
  g_map[cell.x][cell.z] += 1;
  g_worldMap.rebuild();
}

function deleteBlock() {
  let cell = getTargetCell();
  if (!cell) return;
  if (g_map[cell.x][cell.z] > 0) {
    g_map[cell.x][cell.z] -= 1;
    g_worldMap.rebuild();
  }
}

function registerMouseEvents() {
  // canvas pointer lock
  canvas.addEventListener('click', function() {
    if (document.pointerLockElement !== canvas) {
      canvas.requestPointerLock();
    }
  });

  document.addEventListener('mousemove', function(ev) {
    if (document.pointerLockElement !== canvas) return;

    let sensitivity = 0.2;
    let deltaX = ev.movementX;

    if (deltaX > 0) {
      g_camera.panRight(deltaX * sensitivity);
    } else if (deltaX < 0) {
      g_camera.panLeft(-deltaX * sensitivity);
    }

  });

  document.addEventListener('mousedown', function(ev) {
    if (document.pointerLockElement !== canvas) return;
    if (ev.button === 0) deleteBlock();
    if (ev.button === 2) addBlock();
  });

  canvas.addEventListener('contextmenu', ev => ev.preventDefault());

  // escape to release pointer lock
  document.addEventListener('pointerlockchange', function() {
    if (document.pointerLockElement === canvas) {
      console.log('Pointer locked');
    } else {
      console.log('Pointer released');
    }
  });
}

function convertCoodinateEventsToGL(ev){
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}

const g_keys = new Set();

document.addEventListener('keydown', ev => g_keys.add(ev.key));
document.addEventListener('keyup', ev => g_keys.delete(ev.key));

function isWall(wx, wz) {
  let mx = Math.floor(wx-g_worldMap.offsetX);
  let mz = Math.floor(wz-g_worldMap.offsetZ);
  if (mx < 0 || mz < 0 || mx >= g_map.length || mz >= g_map[0].length) return true;
  let val = g_map[mx][mz];
  return val > 0 && val !== TREASURE_VAL;
}

function collidesWithWall() {
  const r = 0.2;
  let x = g_camera.eye.elements[0];
  let z = g_camera.eye.elements[2];
  return isWall(x + r, z) || isWall(x - r, z) || isWall(x, z + r) || isWall(x, z - r);
}

function processKeys() {
  const speed = 0.1;

  let fwd  = 0;
  let side = 0;
  if (g_keys.has('w')) fwd += 1;
  if (g_keys.has('s')) fwd -= 1;
  if (g_keys.has('a')) side -= 1;
  if (g_keys.has('d')) side += 1;

  if (fwd !== 0 && side !== 0) {
    const inv = 1 / Math.sqrt(2);
    fwd  *= inv;
    side *= inv;
  }

  if (fwd !== 0 || side !== 0) {
    let savedEye = new Vector3(g_camera.eye.elements);
    let savedAt  = new Vector3(g_camera.at.elements);

    if (fwd > 0) g_camera.moveForward(fwd * speed);
    if (fwd < 0) g_camera.moveBackwards(-fwd * speed);
    if (side > 0) g_camera.moveRight(side * speed);
    if (side < 0) g_camera.moveLeft(-side * speed);

    if (collidesWithWall()) {
      g_camera.eye.set(savedEye);
      g_camera.at.set(savedAt);
    }
  }

  if (g_keys.has('q')) g_camera.panLeft(3);
  if (g_keys.has('e')) g_camera.panRight(3);

  if (g_keys.has(' ') && g_onGround) {
    g_velY = jump_vel;
    g_onGround = false;
  }
}


function checkTreasure() {
  if (g_gameWon) return;
  let eye = g_camera.eye.elements;
  let mx = Math.floor(eye[0] - g_worldMap.offsetX);
  let mz = Math.floor(eye[2] - g_worldMap.offsetZ);
  if (mx < 0 || mz < 0 || mx >= g_map.length || mz >= g_map[0].length) return;

  if (g_map[mx][mz] === TREASURE_VAL) {
    g_map[mx][mz] = 0;
    g_worldMap.rebuild();
    g_treasureFound++;
    document.getElementById('treasure-count').textContent = g_treasureFound;
    if (g_treasureFound >= g_treasureTotal) {
      g_gameWon = true;
      document.getElementById('treasure-win').style.display = 'block';
    }
  }
}

function renderTreasures() {
  for (let x = 0; x < g_map.length; x++) {
    for (let z = 0; z < g_map[x].length; z++) {
      if (g_map[x][z] !== TREASURE_VAL) continue;
      let t = new Cube();
      t.textureNum = -2;
      t.color = [1.0, 0.84, 0.0, 1.0]; // gold
      t.matrix = new Matrix4();
      let wx = x + g_worldMap.offsetX;
      let wz = z + g_worldMap.offsetZ;
      t.matrix.translate(wx + 0.25, g_worldMap.offsetY + 0.5 + 0.1 * Math.sin(g_seconds * 2), wz + 0.25);
      t.matrix.rotate(g_seconds * 90, 0, 1, 0);
      t.matrix.scale(0.5, 0.5, 0.5);
      t.render();
    }
  }
}

function renderScene() {
  var startTime = performance.now();

  g_camera.projectionMatrix.setPerspective(g_camera.fov, canvas.width/canvas.height, 0.1, 1000);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);

  g_camera.viewMatrix.setLookAt(
    g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2],
    g_camera.at.elements[0],  g_camera.at.elements[1],  g_camera.at.elements[2],
    g_camera.up.elements[0],  g_camera.up.elements[1],  g_camera.up.elements[2]
  );
  gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);

  var globalRotMat = new Matrix4();
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.uniform3f(u_LightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
  gl.uniform3f(u_CameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);
  gl.uniform1i(u_ShowNormals, g_normalOn);
  gl.uniform1i(u_LightOn, g_lightOn);

  var light = new Cube();
  light.color = [1, 1, 0, 1];
  light.textureNum = -2;
  light.matrix.translate(g_lightPos[0], g_lightPos[1], g_lightPos[2]);
  light.matrix.scale(-.1, -.1, -.1);
  light.matrix.translate(-0.5, -0.5, -0.5);
  light.render();

  gl.disableVertexAttribArray(a_Normal);
  gl.vertexAttrib3f(a_Normal, 0, 1, 0);

  var floor = new Cube();
  floor.color = [1, 0, 0, 1];
  floor.textureNum = 1;
  floor.matrix.translate(0, -0.75, 0.0);
  floor.matrix.scale(32, 0.01, 32);
  floor.matrix.translate(-0.5, 0, -0.5);

  floor.render();

  var sky = new Cube();
  sky.color = [1, 0, 0, 1];
  sky.textureNum = 0;
  sky.flipNormals = true;
  sky.matrix.scale(50, 50, 50);
  sky.matrix.translate(-0.5, -0.5, -0.5);

  sky.render();

  var sphere = new Sphere();
  sphere.color = [1, 0, 0, 1];
  sphere.textureNum = -3;
  sphere.matrix.translate(-1, 1, -1);
  sphere.matrix.scale(0.75, 0.75, 0.75);
  gl.uniform1i(u_Specular, true);
  sphere.render();
  gl.uniform1i(u_Specular, false);


  g_worldMap.render();
  renderTreasures();

  if (g_bunny) {
    g_bunny.matrix = new Matrix4();
    g_bunny.color = [0.7, 0.7, 0.7, 1.0];
    g_bunny.matrix.translate(0, -1.01, -2);
    g_bunny.matrix.scale(0.3, 0.3, 0.3);
    g_bunny.render();
  }

  var duration = performance.now() - startTime;
  var fps = Math.floor(1000 / duration);

  var fpsDisplay = document.getElementById('fps');
  if (fpsDisplay) {
    fpsDisplay.textContent = 'FPS: ' + fps;
  }
}

function updateJump() {
  if (g_onGround) return;

  g_velY -= gravity;
  g_camera.eye.elements[1] += g_velY;
  g_camera.at.elements[1]  += g_velY;

  if (g_camera.eye.elements[1] <= ground_y) {
    let overshoot = ground_y - g_camera.eye.elements[1];
    g_camera.eye.elements[1] = ground_y;
    g_camera.at.elements[1] += overshoot;
    g_velY = 0;
    g_onGround = true;
  }
}

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

function tick() {
  g_seconds = performance.now()/1000.0 - g_startTime;

  processKeys();
  updateJump();
  checkTreasure();

  updateAnimation();
  renderScene();

  requestAnimationFrame(tick);
}

function updateAnimation() {
  g_lightPos[0] = Math.cos(g_seconds);
}



