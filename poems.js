// poems.js

// Define poems as arrays of lines
const poems = {
    poem1: [
      "My love for you is endless,",
      "A song that has no end.",
      "Together, our hearts blend,",
      "In a love we’ll always defend."
    ],
    poem2: [
      "You are the light in my dark,",
      "The spark that ignites my soul,",
      "With you, I feel whole,",
      "My guiding star, my eternal goal."
    ],
    poem3: [
      "Together we are stronger,",
      "Bound by love and care.",
      "Forever, we’ll always share,",
      "A bond beyond compare."
    ]
  };
  
  // Function to display the selected poem with a fade-in effect
  function showPoem(poemId) {
    const poemLines = poems[poemId];
    const poemContent = document.getElementById("poem-content");
  
    // Clear any existing content
    poemContent.innerHTML = "";
  
    // Fade in lines one by one
    let index = 0;
  
    function fadeInLine() {
      if (index < poemLines.length) {
        // Create a line element and add it to the content
        const line = document.createElement("p");
        line.classList.add("line");
        line.innerText = poemLines[index];
        poemContent.appendChild(line);
  
        // Trigger fade-in by making it visible
        setTimeout(() => {
          line.classList.add("visible");
        }, 10); // Small delay to start fade-in transition
  
        index++;
        setTimeout(fadeInLine, 1200); // Adjust delay for each line fade-in
      }
    }
  
    // Switch views and start fade-in
    document.getElementById("poem-list").style.display = "none";
    document.getElementById("selected-poem").style.display = "block";
    fadeInLine();
  }
  
  // Go back to poem list
  function goBack() {
    document.getElementById("poem-list").style.display = "block";
    document.getElementById("selected-poem").style.display = "none";
  }
  