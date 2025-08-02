import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_Tag_SubCategory, getbyID_Tag_SubCategory, create_tag_SubCategory,
  delete_tag_SubCategory, update_tag_SubCategory,getByCategory_Tag_SubCategory,upload_tag_Image}  from "../Api/Tag_Api";

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
 
export const getAll_Tag_SubCategorys = AsyncFunctionThunk('getAll_Tag_SubCategory', getAll_Tag_SubCategory);
export const getbyID_Tag_SubCategorys = AsyncFunctionThunk('getbyID_Tag_SubCategory', getbyID_Tag_SubCategory);
export const create_tag_SubCategorys = AsyncFunctionThunk('create_tag_SubCategory', create_tag_SubCategory);
export const upload_tag_Images = AsyncFunctionThunk('upload_tag_Image', upload_tag_Image);
export const delete_tag_SubCategorys = AsyncFunctionThunk('delete_tag_SubCategory', delete_tag_SubCategory);
export const update_tag_SubCategorys = AsyncFunctionThunk('update_tag_SubCategory', update_tag_SubCategory);
export const getByCategory_Tag_SubCategorys = AsyncFunctionThunk('getByCategory_Tag_SubCategory', getByCategory_Tag_SubCategory);


 
const modeSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Tag_SubCategorys.fulfilled, (state, action) => {
        
        state.modes = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_Tag_SubCategorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Tag_SubCategorys.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getbyID_Tag_SubCategorys.fulfilled, (state, action) => {
        console.log(action.payload)
        state.mode = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_Tag_SubCategorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Tag_SubCategorys.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_tag_SubCategorys.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(delete_tag_SubCategorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_tag_SubCategorys.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_tag_SubCategorys.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(create_tag_SubCategorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_tag_SubCategorys.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images 
       .addCase(upload_tag_Images.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(upload_tag_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_tag_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_tag_SubCategorys.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(update_tag_SubCategorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_tag_SubCategorys.rejected, (state, action) => {
        state.loading = false;
        
      })

       // getByCategory_Tag_SubCategorys
       .addCase(getByCategory_Tag_SubCategorys.fulfilled, (state, action) => {
        state.modesWithAdmin = action.payload;
        state.loading = false;
      })
      .addCase(getByCategory_Tag_SubCategorys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getByCategory_Tag_SubCategorys.rejected, (state, action) => {
        state.loading = false;
        
      })
  },
});

export default modeSlice.reducer;
