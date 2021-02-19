
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname,'db.json'))
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    // TODO: Create this
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(middlewares)
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})