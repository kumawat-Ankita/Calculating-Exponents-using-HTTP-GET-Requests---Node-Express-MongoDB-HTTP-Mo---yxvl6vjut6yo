const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/calculate') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // Collecting the incoming data
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body); // Parsing the complete payload as JSON
        const value1 = parseInt(data.num1);
        const value2 = parseInt(data.num2);

        if (isNaN(value1) || isNaN(value2) || value1 <= 0 || value2 < 0) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("The operation cannot be performed");
        } else {
          const result = Math.pow(value1, value2);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(result.toString()); // Sending the result as a string
        }
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid input data");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Invalid endpoint or method");
  }
});

module.exports = server;
