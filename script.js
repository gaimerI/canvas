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

// Draw on the canvas with smoothing
function draw(event) {
    if (!isDrawing) return;

    const { x, y } = getCanvasCoordinates(event);

    // Smoothing by using a quadratic bezier curve
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Move to the last position

    // Control point is the current position, and the end point is the new position
    const controlX = (lastX + x) / 2;
    const controlY = (lastY + y) / 2;
    ctx.quadraticCurveTo(lastX, lastY, controlX, controlY); // Create a smooth curve

    // Draw the line with the current width and color
    ctx.lineWidth = currentWidth;
    ctx.strokeStyle = currentColor;
    ctx.lineJoin = "round"; // Ensures smooth line joins
    ctx.lineCap = "round";  // Ensures smooth line ends
    ctx.stroke();

    // Update the last position
    [lastX, lastY] = [x, y];
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
