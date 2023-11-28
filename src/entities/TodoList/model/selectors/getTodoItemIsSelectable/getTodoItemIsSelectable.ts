import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";
import { TodoItem } from "../../types/todo-item.interface";

export const getTodoItemIsSelectable = (state: StateSchema, item: TodoItem) => {
  const tagId = item.tagId;
  if (tagId === '1') return true;

  const { list } = state.todoList;
  if (tagId === '2') {
    return list.filter((item: TodoItem) => item.tagId === '1').every((item: TodoItem) => item.status === 'completed');
  }
  return list.filter((item: TodoItem) => item.tagId === '2' || item.tagId === '1').every((item: TodoItem) => item.status === 'completed');

};