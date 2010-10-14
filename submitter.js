var DNode = require('dnode');
var express = require('express');
var fs = require('fs');

var app = express.createServer();
app.get('/', function (req, res) {
    var html = fs.readFileSync(__dirname + '/html/submitter.html');
    res.send(html, { 'Content-Type': 'text/html' });
});
app.get('/dnode.js', require('dnode/web').route());

DNode(function (client) {
    this.submit = function (site, data) {
        console.log(site);
        console.dir(data);
    }
}).listen(app, {
    transports : 'websocket xhr-multipart xhr-polling htmlfile'.split(/\s+/),
}).listen(6666)

console.log('Submitter running on 0.0.0.0:6666');

