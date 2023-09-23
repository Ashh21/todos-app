import React, { useEffect, useState } from "react";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : [];
  });
  const [editId, setEditId] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addHandler = (e) => {
    e.preventDefault();
    if (editId) {
      const updateTodos = todos.map((todo) =>
        todo.id === editId
          ? { id: todo.id, input }
          : { id: todo.id, input: todo.input }
      );

      setTodos([...updateTodos]);
      setInput("");
      setEditId("");
      return;
    }
    if (input !== "") {
      setTodos([{ id: input + Date.now(), input }, ...todos]);
      setInput("");
    }
  };

  const deleteHandler = (id) => {
    const updateTodo = todos.filter((todo) => todo.id !== id);
    setTodos([...updateTodo]);
  };

  const editHandler = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setInput(editTodo.input);
    setEditId(editTodo.id);
  };

  return (
    <div className="  w-1/2 m-auto min-h-[100vh] flex flex-col justify-center  ">
      <div className="bg-orange-200 h-[80vh] rounded-xl ">
        <h1 className="text-3xl font-bold pt-6 text-center bg-orange-100 rounded-t-xl text-orange-500 pb-6 ">
          {" "}
          Todo App{" "}
        </h1>
        <form onSubmit={addHandler} className="flex justify-center py-8 ">
          <input
            className=" border-2 border-white bg-orange-50 rounded-l-full outline-none pl-6 w-[80%]   "
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            type="submit"
            className="p-6 border-2 border-white text-orange-500 font-semibold rounded-r-full"
          >
            {editId ? "Edit" : "Add"}
          </button>
        </form>
        <ul className="text-center ">
          {todos.map((todo) => (
            <div className=" border-none " key={todo.id}>
              <li className=" w-[80%] h-auto m-auto p-5 my-2 text-left  rounded-2xl bg-orange-50">
                <span className="text-orange-500 font-semibold text-xl">
                  {todo.input}
                </span>
              </li>
              <div className="py-4">
                <button
                  onClick={() => editHandler(todo.id)}
                  className="mx-2 bg-white px-6 py-2 rounded-lg text-orange-500 font-semibold shadow-xl hover:bg-orange-50 "
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(todo.id)}
                  className="mx-2 bg-white p-2 px-4 rounded-lg text-orange-500 font-semibold shadow-xl hover:bg-orange-50 "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Todo };
