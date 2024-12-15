// Function to dynamically load games
async function loadGames() {
  const gamesContainer = document.getElementById('games');

  try {
      // Fetch the games data from games.json
      const response = await fetch('games.json');
      const gamesData = await response.json();

      gamesData.forEach(game => {
          const gameElement = document.createElement('div');
          gameElement.classList.add('game');

          gameElement.innerHTML = `
              <div class="gameicon" style="background-image: url(${game.imageUrl}); background-size: cover; background-position: center center;"></div>
              <div id="game-content" class="game-content">
                  <h1><i class="fa-solid fa-gamepad fa-sm" style="color: #ffffff;"></i> ${game.name}</h1>
                  <p><i class="fa-solid fa-user fa-xs" style="color: #ffffff;"></i> By ${game.by}</p>
                  <button onclick="window.location.href='${game.link}';" class="install">Play Now! <i class="fa-solid fa-chevron-right fa-xs" style="color: #ffffff;"></i></button>
              </div>
          `;

          gamesContainer.appendChild(gameElement);
      });
  } catch (error) {
      console.error('Error fetching games data:', error);
  }
}

// Call the function to load games
loadGames();


