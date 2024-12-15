// Check if the page is being displayed in an iframe
if (window.top !== window.self) {
    // Create the notification container
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.fontSize = '16px';
    notification.style.zIndex = '1000';
    notification.style.display = 'flex';
    notification.style.justifyContent = 'space-between';
    notification.style.alignItems = 'center';
    notification.style.width = '300px';

    // Create the message element
    const message = document.createElement('span');
    message.textContent = 'MUST READ!!!!!! This game has to be opened in a new window. Press ok to open the game. The game must be put into fullscreen before the game is loading or it will not work. If it ever ask you if want to leave the site press cancel or the game will not work';

    // Create the "Got it" button
    const button = document.createElement('button');
    button.textContent = 'OK';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '5px 15px';
    button.style.fontSize = '14px';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '3px';
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#45a049'; // Hover effect
    });
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#4CAF50'; // Reset hover effect
    });

    // Add message and button to the notification
    notification.appendChild(message);
    notification.appendChild(button);

    // Append the notification to the body
    document.body.appendChild(notification);

    // Add event listener for the button click
    button.addEventListener('click', function() {
        // Open the new window
        window.open(window.location.href, '_blank', 'width=800,height=600');
        // Stop the current page from loading
        window.location.href = 'about:blank'; // Optionally stop the iframe load
    });
}
