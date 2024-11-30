import React, { useState } from "react";

const TaskList = ({ tasks, updateTask, deleteTask }) => {
   const [editTaskId, setEditTaskId] = useState(null);
   const [updatedTask, setUpdatedTask] = useState({});

   const startEditing = (task) => {
      setEditTaskId(task.id);
      setUpdatedTask({ ...task });
   };

   const handleUpdateChange = (e) => {
      const { name, value } = e.target;
      setUpdatedTask((prev) => ({ ...prev, [name]: value }));
   };

   const saveChanges = () => {
      updateTask(editTaskId, updatedTask);
      setEditTaskId(null);
   };

   const confirmDelete = (id) => {
      if (window.confirm("Are you sure you want to delete")) {
         deleteTask(id);
      }
   };

   return (
      <div className="task-list">
         {tasks.map((task) => (
            <div key={task.id} className="task-card">
               {editTaskId === task.id ? (
                  <div className="edit-task-form">
                     <input
                        type="text"
                        name="title"
                        className="form-control mb-2"
                        value={updatedTask.title}
                        onChange={handleUpdateChange}
                     />
                     <textarea
                     name="description"
                        className="form-control mb-2"
                        value={updatedTask.description}
                        onChange={handleUpdateChange}
                     />

                     <input
                     name="dur_date"
                        type="date"
                        className="form-control mb-2"
                        value={updatedTask.due_date}
                        onChange={handleUpdateChange}
                     />

                     <div className="button-group">
                        <button
                           className="btn btn-success"
                           onClick={saveChanges}
                        >
                           Save
                        </button>
                        <button
                           className="btn btn-secondary"
                           onClick={() => setEditTaskId(null)}
                        >
                           Cancel
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className="task-details">
                     <h3>{task.title}</h3>
                     <p>{task.description}</p>
                     <p>
                        <strong>Due Date:</strong> {task.due_date}
                     </p>
                     <p>
                        <strong>Status:</strong> {task.status}
                     </p>
                     <div className="button-group">
                        <button
                           className={`btn btn-${
                              task.status === "pending" ? "success" : "warning"
                           }`}
                           onClick={() =>
                              updateTask(task.id, {
                                 ...task,
                                 status:
                                    task.status === "pending"
                                       ? "completed"
                                       : "pending",
                              })
                           }
                        >
                           Mark as{" "}
                           {task.status === "pending" ? "Completed" : "Pending"}
                        </button>
                        <button
                           className="btn btn-primary"
                           onClick={() => startEditing(task)}
                        >
                           Edit
                        </button>
                        <button
                           className="btn btn-danger"
                           onClick={() => confirmDelete(task.id)}
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};

export default TaskList;
