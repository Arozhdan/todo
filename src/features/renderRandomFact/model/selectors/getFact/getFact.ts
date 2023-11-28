import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const getFact = (state: StateSchema) => state.fact.fact;