const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if( url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Form data</title></head>');
        res.write('<body><h1>My Header Node example</h1><form action="/message" method="POST"><input type="text" name="message"></input> <div><button type="submit">Send</button></div></body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
            
        })
        
        
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Header Node example</title></head>');
    res.write('<body><h1>My Header Node example</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000);