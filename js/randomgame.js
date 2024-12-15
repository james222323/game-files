var chosenGames = [];
var gameLinks;

// Function to load game links from JSON file
function loadGameLinks() {
  // Assuming the games.json file is in the same directory as your HTML file
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      gameLinks = data.map(game => game.link);
    })
    .catch(error => console.error('Error loading game links:', error));
}

// Call the function to load game links
loadGameLinks();

function openLink() {
  if (!gameLinks || gameLinks.length === 0) {
    console.error('Game links not loaded. Make sure to call loadGameLinks() before using openLink().');
    return false;
  }

  if (chosenGames.length === gameLinks.length) {
    // All games have been chosen, reset the chosenGames array
    chosenGames = [];
  }

  var availableGames = gameLinks.filter(game => !chosenGames.includes(game));
  var chosenGame = availableGames[Math.floor(Math.random() * availableGames.length)];

  // Add the chosen game to the chosenGames array
  chosenGames.push(chosenGame);

  // Update the parent location
  window.location.href = chosenGame;

  return false;
}
