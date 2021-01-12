import React, { Component } from "react";
import axios from 'axios';

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.changeDescription = this.changeDescription.bind(this);
    this.changeResponsible = this.changeResponsible.bind(this);
    this.changePriority = this.changePriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    };
  }

  changeDescription(val) {
    this.setState({
      todo_description: val.target.value,
    });
  }

  changeResponsible(val) {
    this.setState({
      todo_responsible: val.target.value,
    });
  }

  changePriority(val) {
    this.setState({
      todo_priority: val.target.value,
    });
  }

  onSubmit(val) {
    val.preventDefault();

    console.log(`Form submitted: `);
    console.log(`Todo Description: ${this.state.todo_description}`);
    console.log(`Todo Responsible: ${this.state.todo_responsible}`);
    console.log(`Todo Priority: ${this.state.todo_priority}`);

    const newTodo = {
        todo_description: this.state.todo_description,
        todo_responsible: this.state.todo_responsible,
        todo_priority: this.state.todo_priority,
        todo_completed: this.state.todo_completed
    }

    axios.post('http://localhost:4000/todos/add', newTodo)
        .then(responseObj => console.log(responseObj.data));

    // Reset everything
    this.setState({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create a new task</h3>
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
}
