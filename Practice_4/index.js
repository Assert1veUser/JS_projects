const express = require('express');
const Sequelize = require('sequelize');
const {isUserValid, isUserExists} = require('./users');


const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Users App'));

app.listen(port, () => console.log(`Practice_4 listening on port ${port}!`));
const path = require('path');
const dataBasePath = path.join(__dirname, './database.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dataBasePath
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const User = sequelize.define('users', {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true},
    name: Sequelize.STRING });
/*sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`);
        User.bulkCreate([
            { id: 1, name: 'name1' },
            { id: 2, name: 'name2' },
            { id: 3, name: 'name3' }
        ]).then(function() {
            return User.findAll();
        }).then(function(users) {
            console.log(users);
        });
    });*/

app.get('/users', function(req, res) {
    res.sendStatus(200);
    res.writeHead(200, {'Content-Type': 'application/json'})
    User.findAll().then(users => res.json(users));
});
app.get('/users/ascending', function (req, res){
    res.sendStatus(200);
    res.writeHead(200, {'Content-Type' : 'application/json'})

});
app.get('/users/:id', function(req, res) {
    if (isUserExists(Number(req.params.id)) === undefined) {
        res.status(404);
        res.send('Нет такого пользователя')
        return
    }
    res.sendStatus(200);
    res.writeHead(200, {'Content-Type': 'application/json'})
    User.findAll({ where: { id: Number(req.params.id)} }).then(users => res.json(users));
});
app.post('/users', function(req, res) {
    
    User.create({ id: req.body.id, name: req.body.name }).then(function(user) {
        res.sendStatus(200);
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.json(user);
    });

});
app.put('/users/:id', function(req, res) {
    User.findByPk(Number(req.params.id)).then(function(user) {
        user.update({
            id: req.body.id,
            name: req.body.name
        }).then((user) => {
            res.sendStatus(200);
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.json(user);
        });
    });

});
app.delete('/users/:id', function(req, res) {
    User.findByPk(Number(req.params.id)).then(function(user) {
        user.destroy();
    }).then((user) => {
        res.sendStatus(200);
    });
});


