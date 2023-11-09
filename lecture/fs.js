const fs = require('fs')

let file

fs.readFile('./hello', 'utf8', (err, data) => {
    if (err) throw err;
    file = data
    console.log(file)
})