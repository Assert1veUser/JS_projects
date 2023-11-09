const express = require('express')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.get('/', function (req, res){
    res.status(200)
    res.send('Hello world')
})

app.post('/', function (req, res){
    console.log('got post request')
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on ${hostname}:${port}`)
})