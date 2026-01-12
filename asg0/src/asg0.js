// DrawTriangle.js (c) 2012 matsuda
var ctx;
var canvas;
function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');
  ctx.fillStyle='black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(v, color) {
  let scale = 20;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(200 + (v.elements[0] * scale), 200 - (v.elements[1] * scale));
  ctx.stroke();
}

function handleDrawEvent() {
  ctx.fillStyle='black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const v1X = Number(document.getElementById('v1XInput').value);
  const v1Y = Number(document.getElementById('v1YInput').value);
  let v1 = new Vector3([v1X, v1Y , 0]);

  const v2X = Number(document.getElementById('v2XInput').value);
  const v2Y = Number(document.getElementById('v2YInput').value);
  let v2 = new Vector3([v2X, v2Y , 0]);

  drawVector(v1, "red");
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  ctx.fillStyle='black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const v1X = Number(document.getElementById('v1XInput').value);
  const v1Y = Number(document.getElementById('v1YInput').value);
  let v1 = new Vector3([v1X, v1Y , 0]);

  const v2X = Number(document.getElementById('v2XInput').value);
  const v2Y = Number(document.getElementById('v2YInput').value);
  let v2 = new Vector3([v2X, v2Y , 0]);

  const operation = document.getElementById('operationSelect').value;
  const scalar = Number(document.getElementById('scalarInput').value);

  drawVector(v1, "red");
  drawVector(v2, "blue");

  switch(operation){
    case "add":
      drawVector(v1.add(v2), "green");
      break;
    case "subtract":
      drawVector(v1.sub(v2), "green");
      break;
    case "multiply":
      drawVector(v1.mul(scalar), "green");
      drawVector(v2.mul(scalar), "green");
      break;
    case "divide":
      drawVector(v1.div(scalar), "green");
      drawVector(v2.div(scalar), "green");
      break;
    case "magnitude":
      console.log("Magnitude v1: ", v1.magnitude())
      console.log("Magnitude v2: ", v2.magnitude())
      break;
    case "normalize":
      drawVector(v1.normalize(), "green");
      drawVector(v2.normalize(), "green");
      break;
    case "angleBetween":
      console.log("Angle: ", angleBetween(v1, v2))
      break;
    case "area":
      console.log("Area of the triangle: ", areaTriangle(v1, v2))
      break;
  }
}

function angleBetween(v1, v2) {
  const dot = Vector3.dot(v1, v2)

  const v1Mag = v1.magnitude();
  const v2Mag = v2.magnitude();

  if (v1Mag === 0 || v2Mag === 0) return 0;

  const cosTheta = dot / (v1Mag * v2Mag);

  return Math.acos(cosTheta) * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
  const cross = Vector3.cross(v1, v2);
  return cross.magnitude() / 2;
}