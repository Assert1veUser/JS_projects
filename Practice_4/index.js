const crypto = require("crypto");
const express = require('express');
const Sequelize = require('sequelize');
const {isUserValid, isUserExists} = require('./users');
const { Op, STRING} = require("sequelize");


const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
body
app.get('/', (req, res) => res.send('Users App'));

app.listen(port, () => console.log(`Practice_4 listening on port ${port}!`));
const path = require('path');
const {use} = require("express/lib/router");
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

app.get('/users', function (req, res){
    console.log('req.query', req.query)
    const sort = req.query.sort
    const filterName = req.query.name

    const sortValue = sort === 'ASC' ? 'ASC' : "DESC"

    const options = {
        order: [
            ['name', sortValue]
        ]
    }
    if (filterName) {
        options.where = {
            name: {
                [Op.substring]: filterName
            }
        }
    }

    console.log(options)
    
    res.status(200);
    User.findAll(options).then(users => res.json(users));
})
app.get('/users/ascending', function (req, res){
    res.status(200);
    User.findAll().then(users => res.json(users.sort(function(a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
    })))
});
app.get('/users/descending', function (req, res){
    res.status(200);
    User.findAll().then(users => res.json(users.sort(function(a, b) {
        return parseFloat(b.id) - parseFloat(a.id);
    })))
});
app.get('/users/:id', function(req, res) {
    if (User.findAll({ where: { id: Number(req.params.id)} }) === undefined){
        res.status(404);
        res.send('Нет такого пользователя')
        return
    }
    res.status(200);
    User.findAll({ where: { id: Number(req.params.id)} }).then(users => res.json(users));
});
app.post('/users', function(req, res) {
    if(Number(req.params.id) === undefined && Number(req.params.name) === undefined){
        res.status(404);
        res.send('Нет такого пользователя')
        return
    }
    User.create({ id: 12, name: req.body.name }).then(function(user) {
        res.status(200);
        res.json(user);
    });

});
app.put('/users/:id', function(req, res) {
    if (User.findAll({ where: { id: Number(req.params.id)} }) === undefined){
        res.status(404);
        res.send('Нет такого пользователя')
        return
    }
    User.findByPk(Number(req.params.id)).then(function(user) {
        user.update({
            name: req.body.name
        }).then((user) => {
            res.status(200);
            res.json(user);
        });
    });
});
app.put('/users/name/:id', function(req, res) {
    if (User.findAll({ where: { id: Number(req.params.id)} }) === undefined){
        res.status(404);
        res.send('Нет такого пользователя')
        return
    }
    User.findByPk(Number(req.params.id)).then(function(user) {
        user.update({
            name: req.body.name
        }).then((user) => {
            res.status(200);
            res.json(user);
        });
    });
});
app.delete('/users/:id', function(req, res) {
    if (User.findAll({ where: { id: Number(req.params.id)} }) === undefined){
        res.status(404);
        res.send('Нет такого пользователя')
        return
    }
    User.findByPk(Number(req.params.id)).then(function(user) {
        user.destroy();
    }).then((user) => {
        res.status(200);
    });
});


