document.addEventListener('DOMContentLoaded', function () {
    // Check if 'key-input' and 'url-input' elements exist
    var keyInput = document.getElementById('key-input');
    var urlInput = document.getElementById('url-input');

    // Retrieve the user-defined key and URL from localStorage
    var storedUserInput = localStorage.getItem('userInput');
    var storedUrlInput = localStorage.getItem('webInput');

    // If the user has previously set a key, use that value
    // Otherwise, use the value from the 'key-input' element or default to 'R'
    var userInput = storedUserInput || (keyInput ? keyInput.value : '[');

    // If the user has previously set a URL, use that value
    // Otherwise, use the value from the 'url-input' element or default to a default URL
    var url = storedUrlInput || (urlInput ? urlInput.value : 'https://cfisd.schoology.com/home');

    // Set the default key and URL values in localStorage
    localStorage.setItem('userInput', userInput);
    localStorage.setItem('webInput', url);

    // Set the default values in the input elements
    if (keyInput) {
        keyInput.value = userInput;
    }

    if (urlInput) {
        urlInput.value = url;
    }

    // Add event listener for keydown
    document.addEventListener('keydown', function (event) {
        // Check if the pressed key matches the user-defined key
        if (event.key === userInput) {
            // Close the current window
            window.close();

            // Open a new window with the specified URL
            window.open(url, '_blank');
        }
    });
});
