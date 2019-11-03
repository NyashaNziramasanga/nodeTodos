const http = require('http');

// Data which would come from a database
const todos = [
  { id: 1, test: 'Todo One' },
  { id: 2, test: 'Todo Two' },
  { id: 3, test: 'Todo Three' },
];

// Create a server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();

      //Set HTTP status code
      let status = 404;
      const response = {
        success: false,
        data: null,
      };

      //Check HTTP method and url
      if (method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body);
        if (!id || !text) {
          status = 400;
          response.error = 'please add id and text';
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(status, { 'Content-Type': 'application/json', 'X-Powered-By': 'Node' });

      res.end(JSON.stringify(response));
    });
});

// Setup port for server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
