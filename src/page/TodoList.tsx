import React, { useEffect, useState } from "react";
import { TodoApi } from "../tools/instance";
import Todo, { ITodo, Todobox } from "./../components/Todo";
import { Btnbox } from "./../components/Todo";
import { Container } from "../components/Signup";
import { Wrap } from "../components/Signup";
import { TodoDiv } from "./../components/Todo";
import { TodoInput } from "./../components/Todo";
import { TodoBtn } from "./../components/Todo";
import { TodoListBox } from "./../components/Todo";
const TodoList = () => {
  const [content, setContent] = useState("");
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [isfix, setIsFix] = useState(false);

  //get Todo
  // pr test입니다.
  useEffect(() => {
    async function getTodos() {
      const { data } = await TodoApi.getTodos();
      setTodo(data);
      console.log(data);
    }
    getTodos();
  }, []);
  console.log(todo);
  //onChnage
  const TodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  //create Todo
  const AddTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    async function addTodo() {
      try {
        const { data } = await TodoApi.AddTodos(content);
        setTodo([...todo, data]);
        setContent("");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    addTodo();
  };
  //delete Todo
  const DeleteTodo = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    async function deleTodo() {
      try {
        const { data } = await TodoApi.deleTodos(id);
        setTodo(todo?.filter((item: any) => item.id !== id));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    deleTodo();
  };

  //patch Todo
  const PatchTodo = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    fixcontent: string,
    isCompleted: boolean
  ) => {
    e.preventDefault();
    setIsFix(!isfix);
    async function patchTodo() {
      try {
        const { data } = await TodoApi.updateTodos(fixcontent, isCompleted, id);
        console.log(data);
        setTodo(
          todo.map((item) =>
            item.id === data.id ? { ...item, todo: data.todo } : item
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
    patchTodo();
  };
  return (
    <>
      <Container>
        <Wrap>
          <TodoDiv>
            <TodoInput
              name="content"
              type="text"
              value={content}
              onChange={TodoHandler}
            ></TodoInput>
            <TodoBtn onClick={(e) => AddTodo(e)}>추가</TodoBtn>
          </TodoDiv>
          <div>
            <TodoListBox>
              {todo?.map((item, index) => (
                <div key={index}>
                  <Todo
                    to={item}
                    setTodo={setTodo}
                    setContent={setContent}
                    content={content}
                    DeleteTodo={DeleteTodo}
                    PatchTodo={PatchTodo}
                  />
                </div>
              ))}
            </TodoListBox>
          </div>
        </Wrap>
      </Container>
    </>
  );
};

export default TodoList;
