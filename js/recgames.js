document.addEventListener("DOMContentLoaded", function () {
   var chosenGames = [];
   var gameLinks;
 
   // Function to load game links from JSON file
   function loadGameLinks() {
     // Assuming the games.json file is in the same directory as your script.js file
     return fetch('games.json')
       .then(response => response.json())
       .then(data => {
         gameLinks = data.map(game => game.link);
       })
       .catch(error => console.error('Error loading game links:', error));
   }
 
   // Function to shuffle an array
   function shuffleArray(array) {
     return array.sort(() => Math.random() - 0.5);
   }
 
   // Function to set the href and src attributes for each game link and image
   function setGameAttributes() {
     // Shuffle the array to get a random order
     var shuffledLinks = shuffleArray(gameLinks);
 
     // Set the href and src attributes for each game link and image
     for (var i = 0; i < shuffledLinks.length; i++) {
       var gameLink = document.getElementById("game" + (i + 1) + "Link");
       var gameImage = document.getElementById("game" + (i + 1));
 
       gameLink.href = shuffledLinks[i];
       gameImage.src = getParameterValue(shuffledLinks[i], "image");
     }
   }
 
   // Call the function to load game links and set game attributes
   loadGameLinks().then(() => {
     setGameAttributes();
   });
 
   // Function to get a parameter value from the URL
   function getParameterValue(url, parameter) {
     var urlParams = new URLSearchParams(url);
     return urlParams.get(parameter);
   }
 });
 