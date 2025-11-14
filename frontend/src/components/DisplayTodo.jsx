import { useEffect, useState } from "react";
import axios from "axios";

const DisplayTodo=()=>{
    const [todo,setTodo]=useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/todos");
                setTodo(response.data.todo);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <div>
            <h1 className="text-2xl text-red-500">Display Todo Component 👇🏻</h1>
            {
                todo.length==0?(<p>No todo Found</p>):(
                    todo.map(todo=>(
                        <div key={todo._id} className="border-2 border-black m-2 p-2">
                            <h3>Title: {todo.title}</h3>
                            <p>Description: {todo.description}</p>
                            <p>Status: {todo.completed ? "✔ Completed" : "❌ Not Completed"}</p>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default DisplayTodo;