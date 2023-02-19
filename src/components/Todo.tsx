import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Wrap } from "./Signup";
import axios from "axios";
import { TodoApi } from "./../tools/instance";

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
type todoProps = {
  to: ITodo;
};

const Todo = ({
  to,
  content,
  setContent,
  setTodo,

  DeleteTodo,

  PatchTodo,
}: todoProps | any) => {
  const { id, todo, isCompleted, userId } = to;
  const token = window.localStorage.getItem("token");
  const [isfix, setIsFix] = useState(false);
  const [fixcontent, setFixcontent] = useState(to?.todo);

  //updateHandler
  const updateHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsFix(!isfix);

    console.log(id);
  };

  return (
    <>
      {isfix && (
        <Todobox>
          <li>
            <label>
              <input type="checkbox" />
              <input
                value={fixcontent}
                onChange={(e) => setFixcontent(e.target.value)}
              />
            </label>
          </li>

          <Btnbox>
            <button
              onClick={(e) => {
                PatchTodo(e, to?.id, fixcontent, to?.isCompleted);
                setIsFix(!isfix);
              }}
            >
              제출
            </button>
            <button onClick={(e) => DeleteTodo(e, to?.id)}>삭제</button>
          </Btnbox>
        </Todobox>
      )}
      {!isfix && (
        <Todobox>
          <li>
            <label>
              <input type="checkbox" />
              <span>{to?.todo}</span>
            </label>
          </li>

          <Btnbox>
            <button onClick={(e) => updateHandler(e, to?.id)}>수정</button>
            <button onClick={(e) => DeleteTodo(e, to?.id)}>삭제</button>
          </Btnbox>
        </Todobox>
      )}
    </>
  );
};

export default Todo;
export const TodoDiv = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  border: 1px solid none;
`;
export const TodoInput = styled.input`
  width: 200px;
  height: 20px;
`;
export const TodoBtn = styled.button`
  width: 50px;
  height: 25px;
`;
export const TodoListBox = styled.div`
  width: 500px;
  height: 700px;
  border: 1px solid black;
`;
export const Todobox = styled.div`
  display: flex;
`;
export const Btnbox = styled.div`
  gap: 15px;
`;
