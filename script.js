// Select DOM elements
const inputText = document.getElementById('inputText');
const tokenizeButton = document.getElementById('tokenizeButton');
const output = document.getElementById('output');

// Function to tokenize text
function tokenizeText(text) {
    // Split text into tokens using spaces, punctuation, and newlines as delimiters
    const tokens = text.match(/\b\w+\b/g) || [];
    return tokens;
}

// Add an event listener to the button
tokenizeButton.addEventListener('click', () => {
    const text = inputText.value; // Get the input text
    const tokens = tokenizeText(text); // Tokenize the text
    output.textContent = JSON.stringify(tokens, null, 2); // Display the tokens as a JSON array
});
