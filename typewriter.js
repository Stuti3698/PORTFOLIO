// Adding an event listener to the "Download CV" button
document.getElementById("download-cv").addEventListener("click", function () {
  // Creating a new anchor element
  var link = document.createElement("a");
  // Setting the href attribute to the path of your CV
  link.href = "resume2.pdf"; // replace with the actual path to your CV
  // Setting the download attribute to specify the name of the downloaded file
  link.download = "your-cv.pdf"; // replace with the actual name of your CV
  // Programmatically clicking the link to trigger the download
  link.click();
});

// Creating a TypeWriter class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  // Method for typing text
  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get the full text of the current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove a character
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add a character
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert the text into the HTML element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial typing speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If the word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Pause at the end of the word
      typeSpeed = this.wait;
      // Set "delete" to true for deleting animation
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to the next word
      this.wordIndex++;
      // Pause before starting to type the next word
      typeSpeed = 500;
    }

    // Set a timeout to continue typing
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Initialize the TypeWriter
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Initialize TypeWriter with the specified element, words, and wait time
  new TypeWriter(txtElement, words, wait);
}
