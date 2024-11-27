// Get references to DOM elements
const textInput = document.getElementById('textInput');
const tokenizeButton = document.getElementById('tokenizeButton');
const output = document.getElementById('output');

// Event listener for the "Tokenize" button
tokenizeButton.addEventListener('click', () => {
  // Get the text input value
  const text = textInput.value;

  // Tokenize the text (split by spaces or punctuation)
  const tokens = text
    .trim()
    .split(/\s+|[.,!?;:()]/) // Split by spaces and punctuation
    .filter(token => token.length > 0); // Remove empty tokens

  // Display the tokens in the output div
  output.textContent = JSON.stringify(tokens, null, 2);
});
