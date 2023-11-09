const express = require('express')
const { users } = require('./users.js')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.get('/', function (req, res){
    res.status(200)
    res.send('Hello world')
})

app.get('/users', function (reg, res){
    //res.status(300)
    console.log(users)
    res.send(users)
})

app.get('/users-1', function (reg, res){
    const userToFind = users.find((user) => user.id === 1)
    res.send(userToFind)
})

app.post('/', function (req, res){
    console.log('got post request')
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on ${hostname}:${port}`)
})