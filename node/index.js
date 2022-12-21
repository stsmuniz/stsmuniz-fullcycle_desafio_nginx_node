const express = require('express');

const app = express();

const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    multipleStatements: true,
};

const mysql = require('mysql');

const connection = mysql.createConnection(config)
    .on('error', (err) => console.log(err.toString()));

const sql = `INSERT INTO people(name) values('Salustiano');`;
connection.query(sql);

app.get('/', (req,res) => {
    let name = '';

    connection.query('SELECT name FROM people', (err, result) => {
        if (err) throw err;
        console.log(result);
        let message = `<h1>Full Cycle Rocks!</h1>
        <p>- Lista de nomes cadastrada no banco de dados</p>
        <ul>`;
        result.forEach(element => {
            console.log(element);
            message += `<li>${element.name}</li>`;
        });
        message += '</ul>';
        res.send(message)
    });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})