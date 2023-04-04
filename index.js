const http = require('http');
const url = require('url');
const fs = require('fs');

const errorData = fs.readFileSync('./404.html', (err, data) => {
    if (err) throw err;
    return data;
});

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let filename = req.url === '/' ? './index.html' : `.${req.url}.html`;

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.end(errorData);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    })
}).listen(5000);