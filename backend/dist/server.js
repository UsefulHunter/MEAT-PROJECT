"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
// compileOnSave não funcionando automaticamente no VSCOODE, utilizar o comando
// tsc no terminal, para forçar a compilação para javascript, para então conseguir rodar
// o servidor
var fs = require("fs");
var https = require("https");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
//
server.post('/login', function (req, resp) {
    resp.json({ message: 'ok' });
});
// Use default router
server.use(router);
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3002, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
