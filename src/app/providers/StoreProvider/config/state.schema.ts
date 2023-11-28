import {
  type AnyAction,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject,
} from "@reduxjs/toolkit"
import { type NavigateOptions, type To } from "react-router-dom"
import { type AxiosInstance } from "axios"
import { type CombinedState } from "redux"
import { TodoListSchema } from "@/entities/TodoList"
import { FactSchema } from "@/features/renderRandomFact"

export interface StateSchema {
  todoList: TodoListSchema
  fact: FactSchema
}
export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
