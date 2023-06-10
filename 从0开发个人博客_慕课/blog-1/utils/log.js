const fs = require('fs');
const path = require('path')


function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

// B 水桶
function createWriteStream(fileName) {
    // 只一步封装只是多加一个路径处理而已.
    const fullFileName = path.join(__dirname, '../', '../', 'logs',fileName)
    const writeStream = fs.createWriteStream(fullFileName, {flags: 'a'})
    return writeStream
}
// 创建接收水桶的步骤
const accessWtireStream = createWriteStream('access.log')

function access(log) {
    writeLog(accessWtireStream, log)
}

module.exports = {
    access
}

