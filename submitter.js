var DNode = require('dnode');
var express = require('express');
var fs = require('fs');

var app = express.createServer();
app.get('/', function (req, res) {
    var html = fs.readFileSync(__dirname + '/html/submitter.html');
    res.send(html, { 'Content-Type': 'text/html' });
});
app.get('/dnode.js', require('dnode/web').route());
app.get('/form_:name', function (req, res) {
    var html = fs.readFileSync(__dirname + '/html/form_' + req.params.name + '.html');
    res.send(html, { 'Content-Type': 'text/html' });
});

DNode(function (client) {
    this.submit = function (data) {
        console.dir(data);
    }
}).listen(app, {
    transports : 'websocket xhr-multipart xhr-polling htmlfile'.split(/\s+/),
}).listen(4001);

app.listen(4000);

console.log('Submitter running on 0.0.0.0:4000');

