
const express = require('express');
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

// Endpoint to handle POST requests for exponentiation
app.post('/', (req, res) => {
  const { num1, num2 } = req.body;

  // Check if num1 and num2 are provided and valid
  if (num1 === undefined || num2 === undefined || typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).send('Invalid input: Both num1 and num2 must be numbers.');
  }

  // Check conditions for num1 and num2
  if (num1 <= 0) {
    return res.status(404).send('The operation cannot be performed. num1 must be a positive integer.');
  }

  if (num2 < 0 || !Number.isInteger(num2)) {
    return res.status(400).send('Invalid input: num2 must be a non-negative integer.');
  }

  // Calculate the exponentiation
  const result = Math.pow(num1, num2);

  // Send the result in the response
  res.status(200).send(`The result is ${result}`);
});


module.exports = server; 
