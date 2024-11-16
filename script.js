// script.js

document.getElementById('start-btn').addEventListener('click', function () {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('question').style.display = 'block';
  });
  
  function answerYes() {
    document.getElementById('question').style.display = 'none';
    document.getElementById('poem').style.display = 'block';
  }
  
  function answerNo() {
    document.getElementById('response').innerText = "Try again… I think you’ll find the right answer 😉";
  }
  
  function showMorePoems() {
    // Redirect to more poems or reveal another section
    alert("More poems coming soon!");
  }
  const poemLines = [
    "You are the stars in my night,",
    "The warmth in my heart,",
    "The love of my life,",
    "My forever, my start."
  ];
  
  let currentLine = 0;
  let currentChar = 0;
  
  function typePoem() {
    const poemElement = document.getElementById("poem-content");
  
    if (currentLine < poemLines.length) {
      // Get the current line and type each character
      if (currentChar < poemLines[currentLine].length) {
        poemElement.innerHTML += poemLines[currentLine][currentChar];
        currentChar++;
        setTimeout(typePoem, 100); // Adjust speed of typing
      } else {
        // Move to the next line after a short pause
        poemElement.innerHTML += "<br>";
        currentLine++;
        currentChar = 0;
        setTimeout(typePoem, 500); // Adjust line pause
      }
    }
  }
  
  function answerYes() {
    document.getElementById("question").style.display = "none";
    document.getElementById("poem").style.display = "block";
    typePoem(); // Start the typing effect
  }
  