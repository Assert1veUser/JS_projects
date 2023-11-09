/*
Напишите сервер, в котором будет реализовано следующее:
- роут стартовой страницы
- роут страницы информации
- роут списка сущностей
- роут единичной сущности
- редирект на стартовую страницу

На роуте стартовой страницы требуется вернуть информацию из файла
На роуте страницы информации требуется вернуть краткую информацию об операционной системе
Создайте в отдельном js-файле массив сущностей, у которых есть ID и название. На роуте списка сущностей требуется вернуть список названий
На роуте единичной сущности требуется вернуть название сущности по идентификатору, взятому из URL.
    Функция получения названия сущности по идентификатору должна быть описана в отдельном файле
*/

const http = require('http');
const {read} = require('./read_file.js')
const {getOSInfo} = require('./os_info')
const {get_entity_info, get_entity_id} = require('./list_entity')

http
    .createServer(async function (request, response){
        const url = request.url
        console.log(url)

        if(url === '/start-page'){
            const fileContent = await read()
            response.write(fileContent);
        }else if(url === '/info'){
            response.write(getOSInfo());
        }else if(url === '/list-entity'){
            response.write(get_entity_info());
        }else if(url.startsWith("/list-entity/")){
            const utlParts = url.split('/')
            const exampleId = utlParts[utlParts.length - 1]
            console.log(exampleId)
            response.write(get_entity_id(exampleId))
        }else {
            response.writeHead(301, {
                Location: `/start-page`
            }).end();
        }
        response.end();
    })
    .listen(3000);



