// Get references to the DOM elements
const textInput = document.getElementById("textInput");
const tokenizeButton = document.getElementById("tokenizeButton");
const output = document.getElementById("output");

// Event listener for the button
tokenizeButton.addEventListener("click", () => {
    // Get the input text
    const text = textInput.value;

    // Tokenize the text into words (split by spaces and remove empty strings)
    const tokens = text.split(/\s+/).filter(token => token.length > 0);

    // Display the tokens
    output.textContent = tokens.length ? tokens.join(", ") : "No words found.";
});
