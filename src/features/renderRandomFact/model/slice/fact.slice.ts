import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FactSchema } from "../types/fact.schema";
import { fetchFact } from "../services/fetchFact/fetchFact";
import { Fact } from "../..";


const initialState: FactSchema = {
  isLoading: false,
  error: "",
  fact: null,
}

export const factSlice = createSlice({
  name: "fact",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFact.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(fetchFact.fulfilled, (state, action: PayloadAction<Fact>) => {
      state.isLoading = false;
      state.error = "";
      state.fact = action.payload;
    });

    builder.addCase(fetchFact.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload || "";
    })
  }
});

export const { actions: factActions } = factSlice
export const { reducer: factReducer } = factSlice