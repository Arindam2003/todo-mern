import axios from "axios";
import { useState } from "react";

const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const createTodo = async () => {
        try {
            const response = await axios.post("http://localhost:3000/todo", {
                title: title,
                description: description
            })
            
            alert(response.data.message + " ✅");
        } catch (error) {
            console.log(error);
            alert("Failed to create todo ❌");
        }
    }

    

    return (
        <div className="flex flex-col gap-4">
            <input type="text" name="" id="" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

            <input type="text" name="" id="" placeholder="Description" onChange={(e) =>setDescription( e.target.value)} />

            <button className="px-4 py-1 bg-red-400 rounded-2xl" onClick={createTodo}>Create</button>
        </div>
    )
}

export default CreateTodo;