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
    const q = 'insert into todos (taskName, taskDesc, createdAt, status) VALUES (?,?,?,?)';
    db.query(q, [req.body.task, req.body.taskDesc, new Date(), 'active'], (err, result) =>{
        if (err) {
           console.log(err);
            
        } else {
            console.log("todo saved");
            const updatedTasks = 'select * from todos'
            db.query(updatedTasks, (error, newList) => {
                res.send(newList)
            })
            
        }
    })
})

app.get('/read-task', (req, res) => {
    const q = 'select * from todos';
    db.query(q, (err, result) => {
        if (err) {
            console.log("failed to read tasks");      
        } else {
            console.log("got tasks successfully from todo");
            res.send(result);
        }
    })
})

app.post('/update-task', (req,res) => {
    console.log(req.body);
    const q = 'update todos set taskName = ? , taskDesc = ? where id = ?'
    db.query(q, [req.body.updatedTask, req.body.updatedTaskDesc, req.body.updateId], (err, result) => {
        if (err) {
            console.log("failed to update");
        } else {
            console.log("Updated");
            db.query('select * from todos', (e,r) =>{
                if (e) {
                    console.log(e);
                    
                } else {
                   res.send(r); 
                }
            })
            
        }
    })
    
})

app.post('/delete-task', (req, res) =>{
    const q = 'delete from todos where id = ?'
    db.query(q, [req.body.id], (err, result) =>{
        if (err) {
            console.log('Failed to delete');
            
        } else {
            console.log('Delete Successfully');
            db.query('select * from todos', (e,newList) =>{
                res.send(newList);
            })
        }
    })
})

app.post('/complete-task', (req, res) =>{
    const q = 'update todos set status = ? where id = ?'
    db.query(q, ['completed', req.body.id], (err,result) =>{
        if (result) {
            db.query('select * from todos', (e, newList) =>{
                res.send(newList);
            })
        } else {
            
        }
    })
})

app.listen(5000, () => {
    console.log("Server Started");
})