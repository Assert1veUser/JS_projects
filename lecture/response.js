const http = require('http');

http
    .createServer(function (request, response){
        response.setHeader('Content-Type', 'text/html');
        response.write('hello');
        response.end();
})
    .listen(3000);