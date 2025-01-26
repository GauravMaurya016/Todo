import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  useEffect(() => {
    let ls = localStorage.getItem("todos");
    if (ls) {
      let todo = JSON.parse(localStorage.getItem("todos"));
      setTodos(todo);
    }
  }, []);

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const toggleFinsihed = (e) => {
    setshowFinished(!showFinished);
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };
  const handleDelete = (e, id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
      let newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLs();
    }
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    saveToLs();
    // console.log(todos);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    console.log(newTodos);
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    saveToLs();
    // console.log(todos.length())
  };
  return (
    <>
      <Navbar />
      <div className=" md:container rounded-xl my-5 md:mx-auto p-5 w-full md:w-1/2 bg-gradient-to-r from-sky-300 to-indigo-600 min-h-[80vh]">
        <h1 className="font-bold text-center text-xl   ">itasks - Manage your todo at one place</h1>
        <div className="addtodo my-5 flex flex-col">
          <h2 className="text-lg font-bold my-1">Add Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white w-full p-1 rounded-sm"
            placeholder="Add Todo"
            aria-label="Add Todo"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 1}
            className="bg-green-400 disabled:bg-green-400 hover:bg-green-500 rounded-lg p-2 py-1 font-bold ">
            Save
          </button>
        </div>
        <input
          onChange={toggleFinsihed}
          type="checkbox"
          checked={showFinished}
          aria-label="Show Finished"
          className="my-3"
        />
        Show Finished
        <h2 className="text-lg font-bold">Your Todo</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 font-bold text-xl">No Todos yet</div>
          )}
          {todos.map((item) => {
            return(showFinished || !item.iscompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
              <div className="flex gap-5">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={todo.iscompleted}
                  aria-label="Mark as completed"
                />
                <div className={item.iscompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-green-400 hover:bg-green-500 rounded-lg p-2 py-1 font-bold mx-1">
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-green-400 hover:bg-green-500 rounded-lg p-2 py-1 font-bold mx-1">
                  <AiTwotoneDelete />
                </button>
              </div>
            </div>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
