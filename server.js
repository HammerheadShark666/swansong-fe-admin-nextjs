const next = require('next');
const https = require('https');
const fs = require('fs');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const sslOptions = {};
try {
  sslOptions.key = fs.readFileSync('./ssl/private.key');
  sslOptions.cert = fs.readFileSync('./ssl/certificate.crt');
} catch (error) {
  console.error('Error reading SSL files:', error);
  process.exit(1); // Exit the process if files can't be read
}

  // Serve your SSL certificate and key
  // const sslOptions = {
  //   key: fs.readFileSync('./ssl/private.key'),
  //   cert: fs.readFileSync('./ssl/certificate.crt'),
  // };

  // Handling all routes using Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the HTTPS server on port 3000
  https.createServer(sslOptions, server).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Server started on https://localhost:3000');
  });
});
