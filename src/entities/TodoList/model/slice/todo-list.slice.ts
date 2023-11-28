import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoListSchema } from "../types/todo-list.schema";
import { TodoItem, TodoItemStatus } from "../types/todo-item.interface";
import { fetchTodoItemsFromAPI } from "../services/fetchTodoItemsFromAPI/fetchTodoItemsFromAPI";
import { LOCALE_STORAGE_COMPLETED_LIST_KEY, LOCALE_STORAGE_TODO_LIST_KEY } from "@/shared/const/localstorage";

const findTodoItemAndChangeStatus = (list: TodoItem[], id: string, status: TodoItemStatus) => {
  const itemIndex = list.findIndex(item => item.id === id)
  if (itemIndex === -1) return

  list[itemIndex].status = status
  const completedIds = window.localStorage.getItem(LOCALE_STORAGE_COMPLETED_LIST_KEY) || '[]'

  const completedIdsArray = JSON.parse(completedIds)

  if (status === TodoItemStatus.COMPLETED) {
    completedIdsArray.push(id)
    console.log(completedIdsArray);
    window.localStorage.setItem(LOCALE_STORAGE_COMPLETED_LIST_KEY, JSON.stringify(completedIdsArray))
  } else {
    console.log('completedIdsArray', completedIdsArray);
    console.log('id to remove', id);

    const newCompletedIdsArray = completedIdsArray.filter((completedId: string) => completedId !== id)
    console.log('newCompletedIdsArray', newCompletedIdsArray);

    window.localStorage.setItem(LOCALE_STORAGE_COMPLETED_LIST_KEY, JSON.stringify(newCompletedIdsArray))
  }
}

const initialState: TodoListSchema = {
  list: [],
  isListError: false,
  isListLoading: false,
  listInited: false,
  isListCompleted: false,
}

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<TodoListSchema>) => {
      state.list = action.payload.list
    },
    initList: (state) => {
      const list = window.localStorage.getItem(LOCALE_STORAGE_TODO_LIST_KEY)
      if (!list) {
        state.listInited = true
        return
      }
      const completedIds = window.localStorage.getItem(LOCALE_STORAGE_COMPLETED_LIST_KEY)
      const listArray = JSON.parse(list)

      if (!completedIds) {
        state.list = listArray
        state.listInited = true
        return
      }
      const completedIdsArray = JSON.parse(completedIds)

      let isListCompleted = true
      const newList = listArray.map((item: TodoItem) => {
        item.status = TodoItemStatus.ACTIVE
        if (completedIdsArray.includes(item.id)) {
          item.status = TodoItemStatus.COMPLETED
        } else {
          isListCompleted = false
        }
        state.listInited = true
        return item
      })
      state.list = newList
      window.localStorage.setItem(LOCALE_STORAGE_TODO_LIST_KEY, JSON.stringify(newList))
      state.listInited = true

      if (!isListCompleted) return
      state.isListCompleted = true

    },
    setListInited: (state, action: PayloadAction<TodoListSchema>) => {
      state.listInited = action.payload.listInited
    },
    makeListItemActive: (state, action: PayloadAction<TodoItem>) => {
      findTodoItemAndChangeStatus(state.list, action.payload.id, TodoItemStatus.ACTIVE)
      state.isListCompleted = false
    },
    makeListItemCompleted: (state, action: PayloadAction<TodoItem>) => {
      const tagId = action.payload.tagId
      if (tagId === '1') {
        findTodoItemAndChangeStatus(state.list, action.payload.id, TodoItemStatus.COMPLETED)
        const isListCompleted = state.list.filter(item => item.tagId === '1').every(item => item.status === TodoItemStatus.COMPLETED)
        if (isListCompleted) state.isListCompleted = true
        return
      }
      if (tagId === '2') {
        // even though we validate this on the UI, we still need to validate it here
        const isPrevCompleted = state.list.filter(item => item.tagId === '1').every(item => item.status === TodoItemStatus.COMPLETED)
        if (!isPrevCompleted) return
        findTodoItemAndChangeStatus(state.list, action.payload.id, TodoItemStatus.COMPLETED)
        const isListCompleted = state.list.filter(item => item.tagId === '2').every(item => item.status === TodoItemStatus.COMPLETED)
        if (isListCompleted) state.isListCompleted = true
        return
      }
      // last case is tagId === '3'
      const isPrevCompleted = state.list.filter(item => item.tagId === '2').every(item => item.status === TodoItemStatus.COMPLETED)
      if (!isPrevCompleted) return
      findTodoItemAndChangeStatus(state.list, action.payload.id, TodoItemStatus.COMPLETED)
      const isListCompleted = state.list.filter(item => item.tagId === '3').every(item => item.status === TodoItemStatus.COMPLETED)
      if (isListCompleted) state.isListCompleted = true
    },

  },
  extraReducers: (builder) => {
    // async actions as an example
    builder.addCase(fetchTodoItemsFromAPI.pending, (state) => {
      state.isListLoading = true
      state.isListError = false
    })
    builder.addCase(fetchTodoItemsFromAPI.fulfilled, (state, action) => {
      state.isListLoading = false
      state.list = action.payload
      window.localStorage.setItem(LOCALE_STORAGE_TODO_LIST_KEY, JSON.stringify(action.payload))
      state.listInited = true
    })
    builder.addCase(fetchTodoItemsFromAPI.rejected, (state) => {
      state.isListLoading = false
      window.localStorage.setItem(LOCALE_STORAGE_TODO_LIST_KEY, JSON.stringify([]))
      state.isListError = true
    })
  }
});

//
export const { actions: todoListActions } = todoListSlice
export const { reducer: todoListReducer } = todoListSlice