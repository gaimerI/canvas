// Select the canvas and set up the rendering context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Center of the canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Size of the cube
const cubeSize = 100;

// Perspective and rotation
let angleX = 0;
let angleY = 0;
const perspective = 500; // Perspective factor

// Vertices of a cube (normalized to size 1)
const vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1]
];

// Edges connecting the vertices
const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Back face
    [4, 5], [5, 6], [6, 7], [7, 4], // Front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
];

// Function to project 3D points to 2D
function project([x, y, z]) {
    const scale = perspective / (perspective + z);
    return [
        centerX + x * scale * cubeSize,
        centerY - y * scale * cubeSize
    ];
}

// Function to rotate a 3D point around the X and Y axes
function rotate([x, y, z]) {
    // Rotate around X-axis
    let newY = y * Math.cos(angleX) - z * Math.sin(angleX);
    let newZ = y * Math.sin(angleX) + z * Math.cos(angleX);

    // Rotate around Y-axis
    let newX = x * Math.cos(angleY) + newZ * Math.sin(angleY);
    newZ = -x * Math.sin(angleY) + newZ * Math.cos(angleY);

    return [newX, newY, newZ];
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rotate cube
    angleX += 0.01;
    angleY += 0.01;

    // Project and draw edges
    const projectedVertices = vertices.map(vertex => project(rotate(vertex)));
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    edges.forEach(([start, end]) => {
        const [x1, y1] = projectedVertices[start];
        const [x2, y2] = projectedVertices[end];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();
