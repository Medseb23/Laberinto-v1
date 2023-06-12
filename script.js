document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("game-container");
  const character = document.querySelector(".character");

  const characterImage = new Image();
  characterImage.src = 'charidleHOR.png'; // Asegúrate de ajustar la ruta de la imagen

  characterImage.onload = function() {
    const characterWidth = characterImage.naturalWidth;
    const characterHeight = characterImage.naturalHeight;
    const mazeWidth = 2000;
    const mazeHeight = 2000;

    const walkRightImages = ['charwalkHOR1.png', 'charwalkHOR2.png', 'charwalkHOR3.png', 'charwalkHOR4.png'];
    let walkRightIndex = 0;

    const walkLeftImages = walkRightImages.slice().reverse(); // Invierte las imágenes para caminar a la izquierda
    let walkLeftIndex = 0;

    const walkDownImages = ['charwalkDO1.png', 'charwalkDO2.png', 'charwalkDO3.png', 'charwalkDO4.png'];
    let walkDownIndex = 0;

    let characterX = 0;
    let characterY = 0;

    function updateCharacterPosition() {
      character.style.left = characterX * characterWidth + "px";
      character.style.top = characterY * characterHeight + "px";
    }

    function moveCharacter(direction) {
      let newX = characterX;
      let newY = characterY;

      switch (direction) {
        case "up":
          character.style.backgroundImage = `url('charidleUP.png')`;
          newY--;
          break;
        case "down":
          character.style.backgroundImage = `url('${walkDownImages[walkDownIndex]}')`;
          walkDownIndex = (walkDownIndex + 1) % walkDownImages.length;
          newY++;
          break;
        case "left":
          character.style.backgroundImage = `url('${walkLeftImages[walkLeftIndex]}')`;
          walkLeftIndex = (walkLeftIndex + 1) % walkLeftImages.length;
          newX--;
          break;
        case "right":
          character.style.backgroundImage = `url('${walkRightImages[walkRightIndex]}')`;
          walkRightIndex = (walkRightIndex + 1) % walkRightImages.length;
          newX++;
          break;
      }

      if (newX >= 0 &&newX < mazeWidth / characterWidth && newY >= 0 && newY < mazeHeight / characterHeight) 
      {
        characterX = newX;
        characterY = newY;
        updateCharacterPosition();
      }
    }

    document.addEventListener("keydown", function(event) {
      switch (event.key) {
        case "w":
          moveCharacter("up");
          break;
        case "s":
          moveCharacter("down");
          break;
        case "a":
          moveCharacter("left");
          break;
        case "d":
          moveCharacter("right");
          break;
      }
    });

    document.addEventListener("keyup", function(event) {
      switch (event.key) {
        case "w":
          character.style.backgroundImage = `url('charidleUP.png')`;
          break;
        case "s":
          character.style.backgroundImage = `url('charidleDO.png')`;
          break;
        case "a":
          character.style.backgroundImage = `url('charidleHOR.png')`;
          character.style.transform = "scaleX(-1)"; // Invierte la imagen para mirar a la izquierda
          break;
        case "d":
          character.style.backgroundImage = `url('charidleHOR.png')`;
          character.style.transform = "scaleX(1)"; // Asegura que la imagen mire a la derecha
          break;
      }
    });
};
