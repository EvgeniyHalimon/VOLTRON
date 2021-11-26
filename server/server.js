const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./api')
const cors = require('cors')

const PORT = 3000

const corsOptions = {
    origin: 'http://localhost:3001'
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/signup', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/signin', db.signin)


