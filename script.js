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

// Utility function to get the correct position for both mouse and touch events
function getPosition(e) {
    if (e.touches) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
        };
    } else {
        return { x: e.offsetX, y: e.offsetY };
    }
}

// Start drawing when the mouse or touch is pressed
function startDrawing(e) {
    isDrawing = true;
    const pos = getPosition(e);
    [lastX, lastY] = [pos.x, pos.y];
}

// Stop drawing when the mouse or touch is released or leaves the canvas
function stopDrawing() {
    isDrawing = false;
}

// Draw on the canvas
function draw(e) {
    if (!isDrawing) return;

    e.preventDefault(); // Prevent scrolling on touch devices
    const pos = getPosition(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Move to the last position
    ctx.lineTo(pos.x, pos.y); // Draw a line to the current position
    ctx.strokeStyle = "#000"; // Set the stroke color
    ctx.lineWidth = 2; // Set the stroke width
    ctx.stroke();
    [lastX, lastY] = [pos.x, pos.y]; // Update the last position
}

// Event listeners for mouse events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Event listeners for touch events
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

// Clear the canvas
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
