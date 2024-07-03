// Array to process
const array = [1, 2, 3, 4, 5];

// Index to keep track of the current element
let currentIndex = 0;

// Interval time in milliseconds
const intervalTime = 1000; // 1 second

// Function to process each element
function processElement(element) {
  console.log('Processing element:', element);
  // Add your processing logic here
}

// SetInterval to process each element at the specified interval
const intervalId = setInterval(() => {
  if (currentIndex < array.length) {
    processElement(array[currentIndex]);
    currentIndex++;
  } else {
    // Clear the interval once all elements are processed
    clearInterval(intervalId);
    console.log('All elements processed.');
  }
}, intervalTime);
