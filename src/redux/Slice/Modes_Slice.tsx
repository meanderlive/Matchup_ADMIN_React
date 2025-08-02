import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  {all_mode_with_Admin, create_mode, delete_mode, getAllmodes,getbtIDmodes, update_mode}  from "../Api/Modes";

// 
 
 
 
const initialState = {
  modes: [],
  mode: {},
  modesWithAdmin:[],
  loading: false,
  error: null,
};



const AsyncFunctionThunk = (name: string, apiFunction: any) => {
  return createAsyncThunk<any, any>(
    `mode/${name}`,
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> = await apiFunction(data);
        return response.data;
      } catch (error) {
        console.error(`Failed to ${name}:`, error);
        throw error;
      }
    }
  );
};
 
export const fetchModes = AsyncFunctionThunk('fetchUser', getAllmodes);
export const getbtIDmode = AsyncFunctionThunk('getbtIDmodes', getbtIDmodes);
export const create_modes = AsyncFunctionThunk('create_modes', create_mode);
export const delete_modes = AsyncFunctionThunk('delete_modes', delete_mode);
export const update_modes = AsyncFunctionThunk('update_modes', update_mode);
export const all_mode_with_Admins = AsyncFunctionThunk('all_mode_with_Admins', all_mode_with_Admin);


 
const modeSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModes.fulfilled, (state, action) => {
        
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
      .addCase(getbtIDmode.fulfilled, (state, action) => {
        console.log(action.payload)
        state.mode = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbtIDmode.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbtIDmode.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // create_modes
      .addCase(delete_modes.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(delete_modes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_modes.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // delete_modes
      .addCase(create_modes.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(create_modes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_modes.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_modes.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(update_modes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_modes.rejected, (state, action) => {
        state.loading = false;
        
      })

       // all_mode_with_Admins
       .addCase(all_mode_with_Admins.fulfilled, (state, action) => {
        state.modesWithAdmin = action.payload;
        state.loading = false;
      })
      .addCase(all_mode_with_Admins.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(all_mode_with_Admins.rejected, (state, action) => {
        state.loading = false;
        
      })
  },
});

export default modeSlice.reducer;
