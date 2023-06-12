const http = require('http')
const PORT = 3000
const serverHandle = require('../app.js')

const server = http.createServer(serverHandle)

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})


