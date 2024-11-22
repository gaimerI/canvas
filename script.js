// Select canvas and button elements
const canvas = document.getElementById("drawingCanvas");
const clearButton = document.getElementById("clearCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Initialize drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Start drawing when the mouse is pressed
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Stop drawing when the mouse is released or leaves the canvas
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

// Draw on the canvas
canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Move to the last mouse position
    ctx.lineTo(e.offsetX, e.offsetY); // Draw a line to the current mouse position
    ctx.strokeStyle = "#000"; // Set the stroke color
    ctx.lineWidth = 2; // Set the stroke width
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Update the last position
});

// Clear the canvas
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
