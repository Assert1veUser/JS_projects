const http = require('http')

http.createServer(function (request, response){
    console.log('server created', request.url);

    response.write('hello')
    response.end()
}).listen(3000);