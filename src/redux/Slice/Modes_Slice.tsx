import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  getAllmodes  from "../Api/Modes";

// 

const initialState = {
  modes: [],
  loading: false,
  error: null,
};


export const fetchModes = createAsyncThunk(
  'modes/fetchModes',
  async () => {
    try {
      const response: AxiosResponse<any, any> | undefined = await getAllmodes();
      return response.data ;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

)

const modeSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModes.fulfilled, (state, action) => {
        console.log(action.payload)
        state.modes = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(fetchModes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchModes.rejected, (state, action) => {
        state.loading = false;
      })
    
  },
});

export default modeSlice.reducer;
