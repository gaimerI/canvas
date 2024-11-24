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

  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.7;

  ctx.drawImage(tempCanvas, 0, 0);
}

resizeCanvas();

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

// Add event listeners for touch events
canvas.addEventListener('touchstart', (e) => {
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
