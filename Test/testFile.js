// var x = 5; // Rule 1
let y = 10;

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 5; j++) {
    for (let k = 0; k < 2; k++) {
      console.log("Nested Loops"); // Rule 2
    }
  }
}
eval();
const url = "http://www.google.com"; // Rule 3
function foo(url) {
  console.log(url);
  console.log("Hello World");
}

const API_KEY = "12345"; // Rule 3
const password = "my_password"; // Rule 3
const JWT_SECRET = "mtysecret";

// Recursive function to calculate factorial
function factorial(n) {
  // Base case: factorial of 0 or 1 is 1
  if (n === 1) {
    return factorial(n);
  }
  // Recursive case: n * factorial of (n - 1)
  // return n * factorial(n - 1);
}

// Example usage
const number = 5;
console.log(`The factorial of ${number} is ${factorial(number)}`);
