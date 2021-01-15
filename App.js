import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import logo from "./logo.svg";

export default function App() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <a className="navbar-brand">To Do List</a>
            
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Things to do</Link>
                </li>

                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create new task</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} /> 
          <Route path="/create" component={CreateTodo} /> 
        </div>
      </Router>
    );
}
