import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const getTodoListCompleted = (state: StateSchema) => state.todoList.isListCompleted;