import CreateTodo from "./components/CreateTodo";
import DisplayTodo from "./components/DisplayTodo";

const App = () => {
  return (
    <div className="bg-amber-200 w-100 p-4 flex flex-col gap-4 items-center m-5">
      <h1 className="text-2xl items-center">Welcome to the Todo App</h1>
      <CreateTodo />
      <DisplayTodo/>
    </div>
  )
}

export default App;