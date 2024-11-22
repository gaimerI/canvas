// Select canvas, button, and color picker elements
const canvas = document.getElementById("drawingCanvas");
const clearButton = document.getElementById("clearCanvas");
const colorPicker = document.getElementById("colorPicker");
const widthPicker = document.getElementById("widthPicker");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Initialize drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = "#000"; // Default color is black
let currentWidth = 5; // Default width is 5
let prevX = 0;
let prevY = 0; // Variables to hold previous position for smoothing

// Utility function to get canvas coordinates from event
function getCanvasCoordinates(event) {
    if (event.touches) {
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
    }
    return {
        x: event.offsetX,
        y: event.offsetY
    };
}

// Start drawing
function startDrawing(event) {
    isDrawing = true;
    const { x, y } = getCanvasCoordinates(event);
    [lastX, lastY] = [x, y];
    [prevX, prevY] = [x, y]; // Initialize previous position
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Draw on the canvas with smoothing
function draw(event) {
    if (!isDrawing) return;

    const { x, y } = getCanvasCoordinates(event);

    // Draw a smoothed line using quadraticCurveTo
    ctx.beginPath();
    ctx.moveTo(prevX, prevY); // Start from the previous point

    // Use quadraticCurveTo for smoothing
    const midX = (lastX + prevX) / 2; // Find the midpoint between the previous point and the current point
    const midY = (lastY + prevY) / 2;

    ctx.quadraticCurveTo(midX, midY, x, y); // Draw a curve to the new point
    ctx.lineWidth = currentWidth;
    ctx.strokeStyle = currentColor;
    ctx.stroke(); // Apply the stroke

    // Update positions
    [prevX, prevY] = [lastX, lastY]; // Store previous point
    [lastX, lastY] = [x, y]; // Update last point
}

// Attach mouse event listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("mousemove", draw);

// Attach touch event listeners
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent scrolling
    startDrawing(e);
});
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent scrolling
    draw(e);
});

// Clear the canvas
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Change the drawing color based on color picker
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value; // Update the current color from the color picker
    console.log("Current color: ", currentColor); // Debugging line
});

// Change the drawing width based on width picker
widthPicker.addEventListener("input", (e) => {
    currentWidth = e.target.value; // Update the current width from the width picker
    console.log("Current width: ", currentWidth); // Debugging line
});
