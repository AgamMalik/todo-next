"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export interface todos {
  id: number;
  title: string;
  completed: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<todos[]>([]);
  const [todoName, setTodoName] = useState<string>("");

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  const addTodos = () => {
    const newTodo = {
      id: Math.random(),
      title: todoName,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoName("");
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const checkTodo = (id: number) => {
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <Box bg="tomato" w="50%" p={4} color="white" h="100%" borderRadius="1rem">
      <div
        style={{
          height: "1rem",
          width: "200%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <textarea
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          style={{
            width: "100%",
            borderRadius: "5px",
            color: "black",
            marginRight: "2rem",
          }}
        />
        <Button onClick={addTodos} colorScheme="blue" size="sm">
          Add Todo
        </Button>
      </div>
      <div
        style={{
          height: "20rem",
          width: "200%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "3rem",

          overflowY: "scroll",
        }}
      >
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                
                width:"100%"
              }}
            >
              <div style={{flex:"1"}}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    checkTodo(todo.id);
                  }}
                />
              </div>
              <div
                style={{
                  flex:"7",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", flex:"5" }}>
                  <div>{todo.title}</div>
                  <div style={{ fontSize: "10px" }}>
                    {todo.completed ? "Completed" : "Not Completed"}
                  </div>
                </div>
                <div style={{flex:"1"}}>

                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                  style={{ marginLeft: "2rem" }}
                  size="xs"
                  >
                  Delete
                </Button>
                  </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default Todo;
