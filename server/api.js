const pool = require('./connection')

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        console.log(results)
        console.log(results.rows)
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
    const {username, email} = request.body
    console.log(username)
    pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).json('Success')
    })
}

const updateUser = (request, response) => {
    console.log('REQUETS', request.body)
    const id = parseInt(request.params.id)
    const {username, email} = request.body
    pool.query(
    'UPDATE users SET username = $1, email = $2 WHERE id = $3',
    [username, email, id],
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

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}