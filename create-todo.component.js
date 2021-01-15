import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom"

export default function CreateTodo(props) {
    const [todo_description, changeDescription] = useState('');
    const [todo_responsible, changeResponsible] = useState('');
    const [todo_priority, changePriority] = useState('');
    const [todo_completed, changeCompleted] = useState(false);

  const onSubmit = (val) => {
    val.preventDefault();

    console.log(`Form submitted: `);
    console.log(`Todo Description: ${todo_description}`);
    console.log(`Todo Responsible: ${todo_responsible}`);
    console.log(`Todo Priority: ${todo_priority}`);

    const newTodo = {
        todo_description: todo_description,
        todo_responsible: todo_responsible,
        todo_priority: todo_priority,
        todo_completed: todo_completed
    }

    axios.post('http://localhost:4000/todos/add', newTodo)
        .then(responseObj => console.log(responseObj.data));

    // Reset everything
    changeDescription('');
    changeResponsible('');
    changePriority('');
    changeCompleted(false);

    props.history.push('/');

    }

    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create a new task</h3>
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={todo_description}
              onChange={e => changeDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={todo_responsible}
              onChange={e => changeResponsible(e.target.value)}
            />
          </div>

          <div className="form-group">

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                onChange={e => changePriority(e.target.value)}
              />
              <label className="form-check-label">Low</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                onChange={e => changePriority(e.target.value)}
              />
              <label className="form-check-label">Medium</label>
            </div>
            
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                onChange={e => changePriority(e.target.value)}
              />
              <label className="form-check-label">High</label>
            </div>

          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create task"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
}
