const poems = {
  poem1: [
    "Roses are red,",
    "Violets are blue,",
    "This poem is sweet,",
    "And so are you!",
  ],
  poem2: [
    "The moon shines bright,",
    "The stars align,",
    "But nothing compares,",
    "To the way you shine.",
  ],
  poem3: [
    "In your smile, I find my home,",
    "In your laugh, my heart does roam.",
    "Every moment with you feels divine,",
    "Forever yours, forever mine.",
  ],
};

function showPoem(poemKey) {
  const selectedPoem = poems[poemKey];
  const poemContent = document.getElementById("selected-poem-content");
  const playAgainBtn = document.getElementById("play-again-btn");

  // Reset content and hide "Play Again" button
  poemContent.innerHTML = '';
  playAgainBtn.style.display = 'none';

  // Display selected poem
  document.getElementById("poem-list").style.display = "none";
  document.getElementById("selected-poem").style.display = "block";

  // Display poem lines with fade-in/fade-out effects
  displayPoemInBatches(selectedPoem, 4);

  // Set up the Play Again button to restart the current poem
  playAgainBtn.onclick = () => displayPoemInBatches(selectedPoem, 4);
}

// Function to display poem lines in batches
function displayPoemInBatches(lines, batchSize) {
  const poemContent = document.getElementById("selected-poem-content");
  const playAgainBtn = document.getElementById("play-again-btn");
  let index = 0;

  function showBatch() {
    // Clear previous lines
    poemContent.innerHTML = '';
    const batch = lines.slice(index, index + batchSize);

    batch.forEach((line, i) => {
      const lineElem = document.createElement("div");
      lineElem.classList.add("line");
      lineElem.style.opacity = '0'; // Start hidden
      lineElem.textContent = line;
      poemContent.appendChild(lineElem);

      // Staggered fade-in for each line
      setTimeout(() => {
        lineElem.style.opacity = '1';
      }, i * 1000); // Adjust 1000ms for stagger timing
    });

    // Wait for all lines to fade in, then fade out the whole batch
    setTimeout(() => {
      batch.forEach((_, i) => {
        const lineElem = poemContent.children[i];
        setTimeout(() => {
          lineElem.style.opacity = '0';
        }, i * 1000); // Staggered fade-out
      });

      // Move to the next batch after fade-out
      setTimeout(() => {
        index += batchSize;
        if (index < lines.length) {
          showBatch();
        } else {
          // Show "Play Again" button at the end of the poem
          playAgainBtn.style.display = 'block';
        }
      }, batchSize * 500 + 1000); // Wait for fade-out and transition time
    }, batchSize * 500 + 1000); // Wait for fade-in to complete
  }

  showBatch(); // Start displaying the first batch
}

function backToList() {
  document.getElementById("poem-list").style.display = "block";
  document.getElementById("selected-poem").style.display = "none";
}
