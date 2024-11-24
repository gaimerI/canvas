// JavaScript for the Canvas Drawing App

// Get the canvas and context
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the viewport
function resizeCanvas() {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCanvas.getContext('2d').drawImage(canvas, 0, 0);

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * 0.9 * dpr);
  canvas.height = Math.floor(window.innerHeight * 0.7 * dpr);
  canvas.style.width = `${window.innerWidth * 0.9}px`;
  canvas.style.height = `${window.innerHeight * 0.7}px`;

  ctx.scale(dpr, dpr);
  ctx.drawImage(tempCanvas, 0, 0);
}

resizeCanvas();
saveState();

document.getElementById('clearCanvas').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
});

// Variables to track drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set up drawing properties
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.strokeStyle = '#007BFF';

// Function to start drawing
function startDrawing(x, y) {
  isDrawing = true;
  lastX = x;
  lastY = y;
}

// Function to draw on the canvas
function draw(x, y) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
  ctx.beginPath(); // Reset path
}

// Add event listeners for mouse events
canvas.addEventListener('mousedown', (e) => startDrawing(e.offsetX, e.offsetY));
canvas.addEventListener('mousemove', (e) => draw(e.offsetX, e.offsetY));
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchcancel', stopDrawing);
canvas.addEventListener('mouseup', saveState);
canvas.addEventListener('touchend', saveState);

// Add event listeners for touch events
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent default scrolling behavior
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  draw(touch.clientX - rect.left, touch.clientY - rect.top);
  e.preventDefault(); // Prevent scrolling while drawing
});
canvas.addEventListener('touchend', stopDrawing);

// Clear the canvas
document.getElementById('clearCanvas').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Handle window resize
window.addEventListener('resize', resizeCanvas);

document.getElementById('colorPicker').addEventListener('input', (e) => {
  ctx.strokeStyle = e.target.value;
});

let undoStack = [];

const MAX_UNDO_STACK = 50;

function saveState() {
  if (undoStack.length >= MAX_UNDO_STACK) {
    undoStack.shift(); // Remove oldest state
  }
  undoStack.push(canvas.toDataURL());
}

function undo() {
  if (undoStack.length) {
    const img = new Image();
    img.src = undoStack.pop();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }
}

// Save state before every draw
canvas.addEventListener('mousedown', saveState);
document.getElementById('undoButton').addEventListener('click', undo);
