import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { create_tag_Category, delete_tag_Category, getAll_Tag_category,getbyID_Tag_Category, update_tag_Category}  from "../Api/Tag_Category_Api";

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
 
export const getAll_Tag_categorys = AsyncFunctionThunk('getAll_Tag_category', getAll_Tag_category);
export const getbyID_Tag_Categorys = AsyncFunctionThunk('getbyID_Tag_Category', getbyID_Tag_Category);
export const create_tag_Categorys = AsyncFunctionThunk('create_tag_Category', create_tag_Category);
export const delete_tag_Categorys = AsyncFunctionThunk('delete_tag_Category', delete_tag_Category);
export const update_tag_Categorys = AsyncFunctionThunk('update_tag_Category', update_tag_Category);
// export const all_mode_with_Admins = AsyncFunctionThunk('all_mode_with_Admins', all_mode_with_Admin);


 
const modeSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Tag_categorys.fulfilled, (state, action) => {
        
        state.modes = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_Tag_categorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Tag_categorys.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getbyID_Tag_Categorys.fulfilled, (state, action) => {
        console.log(action.payload)
        state.mode = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_Tag_Categorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Tag_Categorys.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // create_modes
      .addCase(delete_tag_Categorys.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(delete_tag_Categorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_tag_Categorys.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // delete_modes
      .addCase(create_tag_Categorys.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(create_tag_Categorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_tag_Categorys.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_tag_Categorys.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(update_tag_Categorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_tag_Categorys.rejected, (state, action) => {
        state.loading = false;
        
      })

       // all_mode_with_Admins
      //  .addCase(all_mode_with_Admins.fulfilled, (state, action) => {
      //   state.modesWithAdmin = action.payload;
      //   state.loading = false;
      // })
      // .addCase(all_mode_with_Admins.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(all_mode_with_Admins.rejected, (state, action) => {
      //   state.loading = false;
        
      // })
  },
});

export default modeSlice.reducer;
