const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const {users, isUserValid, hasUser} = require('./users');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.get('/express_backend', (req, res) => { //Строка 9
    res.status(200);
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Строка 10
});
app.get('/users', (req , res) => {
    res.status(200);
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.send(users)
})
app.get('/users/:id', (req , res) => {
    const userId = Number(req.params.id)
    const userFind = users.find((user) => user.id === userId);
    res.status(200);
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.send(userFind)
})
app.post('/users', (req, res) => {
    const dataUser = req.body

    if (!isUserValid(dataUser)){
        res.status(400);
        res.send('error')
        return
    }
    if (hasUser(dataUser.id)) {
        res.status(400);
        res.send('error')
        return
    }
    users.push(dataUser)
    res.status(200);
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.send(dataUser)
})
app.put('/users/:id', function (req, res) {
    const valueId = Number(req.params.id)
    const userFind = users.find((user) => user.id === valueId);

    if (userFind === undefined) {
        res.status(404);
        res.send('Нет такого пользователя')
        return
    }
    const userToUpdate = req.body
    if (!isUserValid(userToUpdate)) {
        res.status(400);
        return
    }

    Object.keys(userToUpdate).forEach((key) => {
        userFind[key] = userToUpdate[key]
    })
    res.status(200);
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.send(userFind);
});
app.delete('/users/:id', (req, res) => {
    const valueId = Number(req.params.id)
    const userIndex = users.findIndex((user) => user.id === valueId);

    if (userIndex === -1) {
        res.status(404);
        return
    }

    users.splice(userIndex, 1)
    res.status(200);
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.send(users);
});

