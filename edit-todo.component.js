import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditTodo(props) {
    const [todo_description, changeDescription] = useState('');
    const [todo_responsible, changeResponsible] = useState('');
    const [todo_priority, changePriority] = useState('');
    const [todo_completed, changeCompleted] = useState(false);
    const [todo_deleted, changeDelete] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:4000/todos/'+props.match.params.id)
        .then(response => {
            changeDescription(response.data.todo_description);
            changeResponsible(response.data.todo_responsible);
            changePriority(response.data.todo_priority);
            changeCompleted(response.data.todo_completed);
        })
        .catch(function(error) {
            console.log(error);
        })
    }, []);

     const onSubmit = (val) => {
          val.preventDefault();

          const obj = {
              todo_description: todo_description,
              todo_responsible: todo_responsible,
              todo_priority: todo_priority,
              todo_completed: todo_completed,
              todo_deleted: todo_deleted
          }

          if(todo_deleted){
            axios.delete('http://localhost:4000/todos/delete/'+props.match.params.id)
            .then(responseObj => console.log(responseObj.data));
          }
          else{
            axios.post('http://localhost:4000/todos/update/'+props.match.params.id, obj)
            .then(responseObj => console.log(responseObj.data));
          }

          props.history.push('/');
        }

        return (
          <div>
            <br/>
            <h3>Edit task</h3>
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
                    checked={todo_priority === 'Low'}
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
                    checked={todo_priority === 'Medium'}
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
                    checked={todo_priority === 'High'}
                    onChange={e => changePriority(e.target.value)}
                  />
                  <label className="form-check-label">High</label>
                </div>
            </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="completedCheckbox"
                    name="completedCheckbox"
                    checked={todo_completed}
                    onChange={() => changeCompleted(!todo_completed)}
                    value={todo_completed}
                  />
                  <label className="form-check-label" htmlFor="completedCheckbox">
                      Completed
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="completedCheckbox"
                    name="completedCheckbox"
                    checked={todo_deleted}
                    onChange={() => changeDelete(!todo_deleted)}
                    value={todo_deleted}
                  />
                  <label className="form-check-label" htmlFor="completedCheckbox">
                      Delete this task
                  </label>
                </div>
                  <br/>

                  <div className="form-group">
                    <input type="submit" value="Update task" className="btn btn-primary"/>
                  </div>
            </form>
            </div>
        );
}
