import { createAsyncThunk } from "@reduxjs/toolkit";
import { TodoItem } from "../../types/todo-item.interface";
import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { mockList } from "../../data/todo-list.mock";
import { LOCALE_STORAGE_TODO_LIST_KEY } from "@/shared/const/localstorage";

export const fetchTodoItemsFromAPI = createAsyncThunk<
  TodoItem[],
  void,
  ThunkConfig<string>
>('todoList/fetchTodoItemsFromAPI', async (_, thunkAPI) => {
  // implement fetchTodoItemsFromAPI here
  console.log('fetchTodoItemsFromAPI');

  const localList = window.localStorage.getItem(LOCALE_STORAGE_TODO_LIST_KEY)
  if (localList) {
    return JSON.parse(localList) as TodoItem[]
  }
  await new Promise(resolve => setTimeout(resolve, 3000))
  return mockList
})