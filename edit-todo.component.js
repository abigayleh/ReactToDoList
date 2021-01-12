import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props){
        super(props);

        this.changeDescription = this.changeDescription.bind(this);
        this.changeResponsible = this.changeResponsible.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.changeCompleted = this.changeCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    changeDescription(val) {
        this.setState({
          todo_description: val.target.value
        });
      }
    
      changeResponsible(val) {
        this.setState({
          todo_responsible: val.target.value
        });
      }
    
      changePriority(val) {
        this.setState({
          todo_priority: val.target.value
        });
      }

      changeCompleted(val) {
          this.setState({
              todo_completed: !this.state.todo_completed
          })
      }

      onSubmit(val) {
          val.preventDefault();
          const obj = {
              todo_description: this.state.todo_description,
              todo_responsible: this.state.todo_responsible,
              todo_priority: this.state.todo_priority,
              todo_completed: this.state.todo_completed
          }
          axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(responseObj => console.log(responseObj.data));
         
        // Return to main page
        this.props.history.push('/');
      }

    render() {
        return (
          <div>
            <h3>Edit task</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Description: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.todo_description}
                  onChange={this.changeDescription}
                />
              </div>

              <div className="form-group">
                <label>Responsible: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.todo_responsible}
                  onChange={this.changeResponsible}
                />
              </div>

              <div className="form-group">
                <label>Priority: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.todo_priority}
                  onChange={this.changePriority}
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
                    checked={this.state.todo_priority === "Low"}
                    onChange={this.changePriority}
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
                    checked={this.state.todo_priority === "Medium"}
                    onChange={this.changePriority}
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
                    checked={this.state.todo_priority === "High"}
                    onChange={this.changePriority}
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
                    onChange={this.changeCompleted}
                    checked={this.state.todo_completed}
                    value={this.state.todo_completed}
                  />
                  <label className="form-check-label" htmlFor="completedCheckbox">
                      Completed
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
}