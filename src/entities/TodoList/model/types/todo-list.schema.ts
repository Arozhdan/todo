import { TodoItem } from "./todo-item.interface"

export interface TodoListSchema {
  list: TodoItem[]
  isListError: boolean
  isListLoading: boolean
  listInited: boolean
  isListCompleted: boolean
}