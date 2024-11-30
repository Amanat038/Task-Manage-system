const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db')

const app = express();
const PORT = 5000;

// middleware

app.use(bodyParser.json());
app.use(cors())

// routes


// create a new task
app.post('/tasks', (req, res) => {
  const {title, description,due_date, status} = req.body;

  if(!title || !due_date ){
    return res.status(404).json({error: "Title and due date are required"})
  }

  const query = `INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)`;
  const values = [title, description || "", due_date, status || 'panding'];

  db.run(query, values,function(err){
    if(err){
      return res.status(500).json({error: err.message});
    }
    res.status(201).json({id:this.lastId, title, description, due_date, status});

    })

  })


  
// view all tasks

app.get('/tasks', (req, res) => {
  const query = `SELECT * FROM tasks`;


  db.all(query,[],(err, rows) => {
    if(err){
      return res.status(500).json({error:err.message});
    }
    res.json(rows);
  });
});




// Update an existing task

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const {title, description, due_date, status} = req.body;

  const query = `UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?`;
  const values = [title, description, due_date, status, id];

  db.run(query, values , function (err) {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    if(this.changes === 0 ){
      return res.status(404).json({error: 'Task not found.'})
    }
    res.json({message: 'Task updated successfully'})
  })
});


// delete a task


app.delete('/tasks/:id',(req, res) => {
  const {id} = req.params;

  const query = `DELETE FROM tasks WHERE id = ?`;


  db.run(query, id, function (err){
    if(err) {
      return res.status(500).json({error: err.message});
    }
    if(this.changes === 0) {
      return res.status(404).json({error: 'Task not found.'});
    }

    res.json({message: 'Task deleted successfully.'})
  })
})




app.listen(PORT, () => {
  console.log(`listening on port  ${PORT}`);
})