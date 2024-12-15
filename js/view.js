function changeGameDetails() {
    const iframe = document.getElementById('iframe');
    const urlParams = new URLSearchParams(window.location.search);
  
    const gameUrl = urlParams.get('game');
    const gameTitle = urlParams.get('title');
    const gameImage = urlParams.get('image');
    const gameCreator = urlParams.get('creator');
    const gameFile = urlParams.get('file');
  
    if (gameUrl) {
      iframe.src = gameUrl;
    }
  
    if (gameTitle) {
      document.querySelector('.titletext').textContent = gameTitle;
    }
  
    if (gameImage) {
      document.querySelector('.gameicon').src = gameImage;
    }
  
    if (gameCreator) {
      document.querySelector('.bytext').textContent = 'By ' + gameCreator;
    }
  
    if (gameFile) {
      // You can use gameFile as needed
    }
  }
  
  changeGameDetails();
  