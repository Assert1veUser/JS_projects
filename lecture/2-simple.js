const http = require('http');

http.createServer(function (request, response){
    console.log('url', request.url);
    console.log('method', request.method);
    console.log('headers', request.headers);
    console.log('headers', request.headers['user-agent']);

    response.write('hello')
    response.end();
}).listen(3000);