const pool = require('./connection')

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

const createUser = (request, response) => {
    const {username, email, password} = request.body
    pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password], (error, results) => {
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

    console.log('EMAIL', email)
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if (error) {
            throw error
        }
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