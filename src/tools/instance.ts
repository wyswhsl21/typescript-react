import axios, { AxiosRequestConfig } from "axios";

const token = window.localStorage.getItem("token");
const AxiosConfig: AxiosRequestConfig = {
  baseURL: "https://pre-onboarding-selection-task.shop/",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};
const instance = axios.create(AxiosConfig);

export const TodoApi = {
  getTodos: () => instance.get("/todos"),
  AddTodos: (payload: string) => instance.post("/todos", { todo: payload }),
  deleTodos: (id: number) => instance.delete(`todos/${id}`),
  updateTodos: (todo: string, isCompleted: boolean, id?: number) =>
    instance.put(`todos/${id}`, { todo: todo, isCompleted: isCompleted }),
};
