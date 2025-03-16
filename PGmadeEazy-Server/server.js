const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db/db.json')
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 5000  // Use Render's PORT or fallback to 5000 locally

server.use(middlewares)
server.use(router)

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`)
})