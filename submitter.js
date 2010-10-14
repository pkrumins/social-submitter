var DNode = require('dnode');
var express = require('express');
var fs = require('fs');

function fileRouter(filename, mime) {
    var mime = mime || 'text/html';
    return function (req, res) {
        fs.readFile(filename, function (err, data) {
            if (!err) {
                res.send(data, { 'Content-Type' : mime });
            }
        });
    }
}

var app = express.createServer();
app.get('/', fileRouter(__dirname + '/html/submitter.html'));
app.get('/dnode.js', require('dnode/web').route());
app.get('/form_:name', function (req, res) {
    var filename = __dirname + '/html/form_' + req.params.name + '.html';
    (fileRouter(filename))(req, res);
});

DNode(function (client) {
    this.submit = function (data) {
        if (!data.username.length) {
            client.error('Username is empty.');
            return;
        }
        if (!data.password.length) {
            client.error('Password is empty.');
            return;
        }
    }
}).listen(app, {
    transports : 'websocket xhr-multipart xhr-polling htmlfile'.split(/\s+/),
}).listen(4001);

app.listen(4000);

console.log('Submitter running on 0.0.0.0:4000');

