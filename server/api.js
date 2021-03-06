const pool = require('./connection')
const bcrypt = require('bcrypt')
const saltRounds = 10

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = async (request, response) => {
    const {username, email, password} = request.body
    const hash = await bcrypt.hash(password, saltRounds)
    console.log(hash)
    pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
    [username, email, hash],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json('Success')
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {username, email, password} = request.body
    pool.query(
    'UPDATE users SET username = $1, email = $2 WHERE id = $4',
    [username, email, password, id],
        (error, results) => {
        if (error) {
            throw error
        }
            response.status(200).json('Success')
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
        response.status(200).send(results.rows)
    })
}

const signin = (request, response) => {
    const {email, password} = request.body

    pool.query('SELECT * FROM users WHERE email = $1', [email], async(error, results) => {
        if (error) {
            throw error
        }
        
        const pass = await bcrypt.compare(password, results.rows[0].password)
        console.log('results.rows[0].password: ', results.rows[0].password);
        console.log('pass: ', pass);
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    signin
}