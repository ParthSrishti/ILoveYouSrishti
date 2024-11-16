// Click "Let's Begin" button functionality
document.getElementById('start-btn').addEventListener('click', function () {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('question').style.display = 'block';
});

function answerYes() {
  document.getElementById('question').style.display = 'none';
  document.getElementById('poem').style.display = 'block';

  // Poem lines to be displayed
  const poemLines = [
    "When I found you",
    "I wasn't looking for forever",
    "It's when I loved you I realized",
    "That you were much more than just my lover\n",
    "My partner for now",
    "And my partner for life",
    "I've never loved anyone" ,
    "Like I have loved you my to-be wife\n",
    "I was a wanderer in search of someone",
    "Someone to hold and someone to kiss",
    "And in this search, I found you I found the one",
    "The one to love and the one to miss\n",

    "Were you also looking for someone",
    "Were you also looking for love",
    "Were you also looking for forever",
    "With me, cause girl you were sent from above\n",

    "If you are looking for forever",
    "I'll shut down all my clocks",
    "So that we're stuck in this moment",
    "As if time had really stopped\n",

    "I'll tell you I love you every second",
    "Except here seconds do not exist",
    "So I'd love you with every breath",
    "Every smile and every kiss\n",

    "I'll spend every moment",
    "With you like its the last",
    "But it would be just this moment forever",
    "Cause even time would deny to go past\n",

    "You and me here alone",
    "In this fragment of time",
    "Loving each other for eternity",
    "Because baby together we're sublime\n",

    "You and me passed a life",
    "While everything else was stuck",
    "Lived together in this moment",
    "Call it destiny or call it luck\n",

    "Your hands in mine",
    "And my eyes in yours",
    "Stuck in this golden hour",
    "As my gaze traces the beauty of your contours\n",

    "As we walked on these duny sands",
    "Treading our steps to the end of time",
    "Thinking about how it's a blessing",
    "Cause darling you're such a divine\n",

    "And when I die you can crank your watch",
    "And restart your clocks, begin the time",
    "And know we were infinite",
    "In the moment that you were mine\n",
  ];

  // Display poem with staggered fade-in/fade-out effects
  displayPoemInBatches(poemLines, 4); // 4 lines at a time
}

function answerNo() {
  document.getElementById('response').innerText = "Try again… I think you’ll find the right answer 😉";
}

// Function to display poem lines in batches of `batchSize`
function displayPoemInBatches(lines, batchSize) {
  const poemContent = document.getElementById("poem-content");
  const playAgainBtn = document.getElementById("play-again-btn");
  let index = 0;

  // Reset the "Play Again" button
  playAgainBtn.style.display = 'none';
  playAgainBtn.onclick = () => displayPoemInBatches(lines, batchSize);

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
      }, i * 1500); // Adjust 500ms for stagger timing
    });

    // Wait for all lines to fade in, then fade out the whole batch
    setTimeout(() => {
      batch.forEach((_, i) => {
        const lineElem = poemContent.children[i];
        setTimeout(() => {
          lineElem.style.opacity = '0';
        }, i * 2500); // Staggered fade-out
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

// Clicking "Click Me" button functionality with random position and counter
let clickCount = 0;

document.getElementById("click-me-btn").addEventListener("click", function () {
  clickCount++;

  // Define random positions within the landing section
  const button = document.getElementById("click-me-btn");
  const landing = document.getElementById("landing");

  const maxX = landing.clientWidth - button.offsetWidth;
  const maxY = landing.clientHeight - button.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;

  // Update feedback message
  const feedbackMessage = document.getElementById("feedback-message");

  if (clickCount < 5) {
    feedbackMessage.textContent = "Uh oh, try again love!";
  } else {
    feedbackMessage.textContent = "Awwww, you did it!";
    button.style.display = "none"; // Hide the "Click Me" button

    // Show the surprise message and "Let’s Begin" button
    document.getElementById("surprise-message").style.display = "block";
    document.getElementById("start-btn").style.display = "inline-block";
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const heartContainer = document.querySelector(".floating-hearts");
  const poemContainer = document.querySelector(".poem-container");

  // Get poem container boundaries
  const poemRect = poemContainer.getBoundingClientRect();

  // Function to generate hearts
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Randomize position while avoiding the central container
    let randomX;
    do {
      randomX = Math.random() * window.innerWidth;
    } while (
      randomX > poemRect.left - 50 && // Leave some buffer space
      randomX < poemRect.right + 50
    );

    heart.style.left = `${randomX}px`;
    heart.style.animationDelay = `${Math.random() * 1.75}s`; // Shorter delay for continuous rain
    heartContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => heart.remove(), 4000); // Match with animation duration
  }

  // Generate hearts continuously at faster intervals
  setInterval(createHeart, 200); // Lower interval for denser rain
});

function navigateToReadMore() {
  console.log("Navigating to Read More Poems..."); // Debugging log
  window.location.href = './readmore.html'; // Adjust the path if 'readmore.html' is in a subfolder
}