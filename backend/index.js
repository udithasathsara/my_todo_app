const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: 'SQLtest',
    database: 'todo_db'
})

db.connect((err) =>{
    if (!err) {
        console.log("Connected to Database Successfully");
    } else {
        console.log(err);
        
    }
})

app.post('/new-task', (req, res) =>{
    console.log(req.body)
    const q = 'insert into todos (taskName, taskDesc, createdAt) VALUES (?,?,?)';
    db.query(q, [req.body.task, req.body.taskDesc, new Date()], (err, result) =>{
        if (err) {
           console.log(err);
            
        } else {
            console.log("todo saved");
            
        }
    })
})

app.listen(5000, () => {
    console.log("Server Started");
})