import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const getFactIsLoading = (state: StateSchema) => state.fact.isLoading;