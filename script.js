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


        // Select stamp tool and selector
const stampSelector = document.getElementById("stampSelector");
const stampTool = document.getElementById("stampTool");

// State for stamping
let isStamping = false;

// Function to draw a circle
function drawCircle(x, y, radius = 30) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();
}

// Function to draw a star
function drawStar(x, y, radius = 30) {
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius / 2;
    let angle = Math.PI / 2 * 3;
    let cx = x;
    let cy = y;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        cx = x + Math.cos(angle) * outerRadius;
        cy = y - Math.sin(angle) * outerRadius;
        ctx.lineTo(cx, cy);
        angle += Math.PI / spikes;

        cx = x + Math.cos(angle) * innerRadius;
        cy = y - Math.sin(angle) * innerRadius;
        ctx.lineTo(cx, cy);
        angle += Math.PI / spikes;
    }
    ctx.closePath();
    ctx.fillStyle = currentColor;
    ctx.fill();
}

// Function to draw a heart
function drawHeart(x, y, size = 30) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + size, x, y + size, x, y + size * 1.5);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + size, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fillStyle = currentColor;
    ctx.fill();
}

// Function to handle stamp placement
function placeStamp(event) {
    const { x, y } = getCanvasCoordinates(event);

    const stampType = stampSelector.value;
    switch (stampType) {
        case "circle":
            drawCircle(x, y);
            break;
        case "star":
            drawStar(x, y);
            break;
        case "heart":
            drawHeart(x, y);
            break;
        default:
            console.error("Unknown stamp type:", stampType);
    }
}

// Toggle stamp mode
stampTool.addEventListener("click", () => {
    isStamping = !isStamping;
    if (isStamping) {
        canvas.addEventListener("click", placeStamp);
        stampTool.textContent = "Stamping: ON";
    } else {
        canvas.removeEventListener("click", placeStamp);
        stampTool.textContent = "Stamping: OFF";
    }
    
});
canvas.addEventListener("touchstart", (e) => {
    if (isStamping) {
        e.preventDefault();
        placeStamp(e);
    }
});
