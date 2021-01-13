import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>

        </td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default function TodosList() {
    const [todo, setTodo] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                {setTodo(response.data)}
            })
            .catch(function(error) {
                console.log(error)
            })
    });

    const listTasks = () => {
        todo.map(function(currentTodo, index){
            return <Todo todo={currentTodo} key={index}/>
        })
    }

        return(
            <div> 
                <br/>
                <h3>Things to do</h3>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {() => listTasks}   
                    </tbody>
                </table>
            </div>
        )
    }
