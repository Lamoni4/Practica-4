const http = require('http');
const fs = require('fs');
const db = require('./db');
require('dotenv').config();

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/data' && req.method === 'GET') {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
      }
      
      const data = JSON.stringify(results, null, 2);

      fs.writeFile('data.txt', data, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: err.message }));
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor levantado en http://localhost${port}`);
});

