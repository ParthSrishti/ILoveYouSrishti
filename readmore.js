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

// Function to toggle accordion content visibility
function toggleAccordion(id) {
  const content = document.getElementById(id);

  // Close all other accordion contents
  const allContents = document.querySelectorAll('.accordion-content');
  allContents.forEach((element) => {
    if (element.id !== id) {
      element.style.display = 'none';
    }
  });

  // Toggle the selected accordion content
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
}

// Function to simulate "Play Again" functionality
function playAgain(id) {
  const content = document.getElementById(id);
  content.style.display = 'none';

  // Display again with a fade effect
  setTimeout(() => {
    content.style.display = 'block';
  }, 1100); // Delay for smooth transition
}
document.querySelectorAll('.accordion-title').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const paragraphs = content.querySelectorAll('p');
    const playAgainButton = content.querySelector('.play-again');

    if (content.style.display === "block") {
      content.classList.remove('show');
      content.classList.add('hide');
      setTimeout(() => {
        content.style.display = "none";
      }, 1000); // Wait for fade-out animation
    } else {
      content.style.display = "block";
      content.classList.remove('hide');
      content.classList.add('show');

      // Show "Play Again" button
      playAgainButton.style.display = "none"; // Hide the play again button initially

      // Fade in paragraphs one by one in batches of 4
      let batchSize = 4;
      let totalParagraphs = paragraphs.length;
      let batchCount = 0;

      function fadeInBatch() {
        let start = batchCount * batchSize;
        let end = Math.min(start + batchSize, totalParagraphs);

        for (let i = start; i < end; i++) {
          paragraphs[i].classList.add('fade-in');
        }

        batchCount++;
        if (start + batchSize < totalParagraphs) {
          setTimeout(fadeInBatch, 1000); // Fade next batch after a delay
        } else {
          // Show the "Play Again" button after all paragraphs have faded in
          setTimeout(() => {
            playAgainButton.style.display = "inline-block"; // Show the play again button
          }, 500);
        }
      }

      fadeInBatch(); // Start fading in paragraphs in batches

      document.querySelectorAll('.play-again').forEach(button => {
        button.addEventListener('click', function() {
          // Get the accordion content for this specific button
          const content = this.closest('.accordion-item').querySelector('.accordion-content');
          
          // Reset the content by removing the fade classes temporarily
          content.classList.remove('fade-in');
          
          // Force reflow to restart the animation
          void content.offsetWidth;
          
          // Add the fade-in class back to trigger animation again
          content.classList.add('fade-in');
        });
      });      
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const heartContainer = document.querySelector(".floating-hearts");

  // Function to generate hearts
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Randomize horizontal position across the full width of the screen
    const randomX = Math.random() * window.innerWidth;

    // Set the heart's initial position
    heart.style.left = `${randomX}px`;
    heart.style.animationDelay = `${Math.random() * 1.75}s`; // Shorter delay for continuous rain

    // Add the heart to the container
    heartContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => heart.remove(), 4000); // Match with animation duration
  }

  // Generate hearts continuously at faster intervals
  setInterval(createHeart, 200); // Lower interval for denser rain
});
