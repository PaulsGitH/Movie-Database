console.log("Hello from the Web App Dev lab!");

function setupButtonFunctionality() {
  const toggleContent = () => {
    let contentDiv = document.querySelector('.introduction');
    const btn = document.querySelector('#showMoreBtn');
    if (contentDiv.style.display === "block") {
      contentDiv.style.display = "none";
      btn.textContent = "Show More";
    } else {
      contentDiv.style.display = "block";
      btn.textContent = "Show Less";
    }
  };

  // shows pop up box when like button is pressed
  const showLikePopup = () => {
    alert('Thank you for liking!');
  };

  // shows pop up box when poke button is press
  const showPokePopup = () => {
    alert('It\'s rude to poke!');
  };

  // buttons
  const showMoreBtn = document.querySelector('#showMoreBtn');
  const likeBtn = document.querySelector('#likeBtn');
  const pokeBtn = document.querySelector('#pokeBtn');

  // event listeners for buttons
  showMoreBtn.addEventListener('click', toggleContent);
  likeBtn.addEventListener('click', showLikePopup);
  pokeBtn.addEventListener('click', showPokePopup);
}

  // Calling function for button functionality
  setupButtonFunctionality();
