import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { To } from "history"
import { NavigateOptions } from "react-router"
import { CombinedState, Reducer } from "redux"
import { StateSchema, ThunkExtraArg } from "./state.schema"
import { createReducerManager } from "./reducerManager"
import { $api } from "@/shared/api/api"
import { todoListReducer } from "@/entities/TodoList"
import { factReducer } from "@/features/renderRandomFact"

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    todoList: todoListReducer,
    fact: factReducer,
    ...asyncReducers,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
