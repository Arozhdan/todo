import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { Fact } from "../../types/fact.interface";

export const fetchFact = createAsyncThunk<
  Fact,
  void,
  ThunkConfig<string>
>('fact/fetchFact', async (_, thunkAPI) => {
  try {
    const { extra } = thunkAPI;
    const { api } = extra;

    const response = await api.get<Fact>('/v2/facts/random');

    if (response.status !== 200) {
      return thunkAPI.rejectWithValue('Error fetching fact')
    }

    const data = response.data;

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Error fetching fact')
  }

})