const http = require('http');

//Would come from a DB
const todos = [
  { id: 1, test: 'Todo One' },
  { id: 2, test: 'Todo Two' },
  { id: 3, test: 'Todo Three' },
];

// Create a server
const server = http.createServer((req, res) => {
  // const { headers, url, method } = req;
  // console.log(headers, url, method);

  // Simple example
  // res.write('<h1>Hello World<h1>');
  // res.end();

  //Returns status code and content type to header
  //Always specify Content-Type for browser to render
  // res.setHeader('Content-Type', 'application/json');
  // res.setHeader('X-Powered-By', 'Node');
  res.writeHead(200, { 'Content-Type': 'application/json', 'X-Powered-By': 'Node' });

  res.end(
    JSON.stringify({
      success: true,
      data: todos,
    })
  );
});

// Set port for server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
