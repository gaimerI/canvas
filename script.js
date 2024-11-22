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
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Draw on the canvas
function draw(event) {
    if (!isDrawing) return;

    const { x, y } = getCanvasCoordinates(event);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Move to the last position
    ctx.lineTo(x, y); // Draw a line to the current position
    ctx.strokeStyle = "#000"; // Set the stroke color
    ctx.lineWidth = 2; // Set the stroke width
    ctx.stroke();
    [lastX, lastY] = [x, y]; // Update the last position
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
