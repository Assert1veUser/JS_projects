const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '/test.txt');
async function read(){
    const data = await fs.readFile(filePath, "utf8");
    return data
}

// module.exports.read = read

module.exports = {
    read
}