// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const serveStatic = require('serve-static');
const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv').config({ path: '../.env' })

const app = express();

// Certificate
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
const certificate = fs.readFileSync(process.env.CERT, 'utf8');
const ca = fs.readFileSync(process.env.CA, 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

// app.use((req, res) => {
//         res.send('Hello there !');
// });
app.use(serveStatic(__dirname + "/dist"));

app.use('/proxy', proxy(process.env.SERVER_URL));
app.use(createProxyMiddleware('/socket.io', { target: process.env.SERVER_URL, ws: true }));

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
        console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
});