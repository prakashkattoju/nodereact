const Pool = require('pg').Pool
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "postgres"
})

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
// use it before all route definitions
app.use(cors({ origin: '*' }));

app.get('/', function (req, res) {
    pool.query('SELECT * FROM employee ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});
app.get('/employee', function (req, res) {
    pool.query('SELECT * FROM employee ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});
app.get('/employee/:id', function (req, res) {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM employee WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

app.post('/employee/create', function (req, res) {
    const { name, skills } = req.body
    pool.query('INSERT INTO employee (name, skills) VALUES ($1, $2) RETURNING *', [name, skills], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
});

app.put('/employee/update/:id', function (req, res) {
    const id = parseInt(req.params.id)
    const { name, skills } = req.body
    pool.query('UPDATE employee SET name = $1, skills = $2 WHERE id = $3', [name, skills, id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
    })
})

app.delete('/employee/delete/:id', function (req, res) {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM employee WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
});

app.listen(3300, () => {
    console.log("Sever is now listening at port 3300");
})