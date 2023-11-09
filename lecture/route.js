const http = require('http');

http
    .createServer(function (request, response){
        response.setHeader('Content-Type', 'text/html');

        const url = request.url
        console.log(url)

        if (url === '/'){
            response.write('main page');
        }else if (url === '/users-tmp'){
            response.statusCode = 302;
            response.setHeader('location', '/users');
        }else if (url === '/users'){
            response.write('users page');
        }else if (url === '/todos'){
            response.write('todos page');
        }else {
            response.statusCode = 400
            response.write('unsnupportede');
        }

        response.end();
    })
    .listen(3000);