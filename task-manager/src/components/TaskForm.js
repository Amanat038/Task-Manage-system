import React, { useState } from "react";
import "./all.css";

const TaskForm = ({ addTask }) => {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [dueDate, setDueDate] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!title || !dueDate) {
         alert("Title and Due Date are required!");
         return;
      }

      addTask({ title, description, due_date: dueDate, status: "pending" });
      setTitle("");
      setDescription("");
      setDueDate("");
   };




   return (
    <div className="task-form-container">
      <h2 className="text-center mb-4">Create New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
