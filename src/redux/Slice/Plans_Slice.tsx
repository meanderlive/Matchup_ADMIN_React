import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_plans, getbyID_plans, create_plans,
  delete_plans, update_plans,upload_plans_Image}  from "../Api/Plan_Api";

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
 
export const getAll_Plan = AsyncFunctionThunk('getAll_Plans', getAll_plans);
export const getbyID_Plan = AsyncFunctionThunk('getbyID_Plans', getbyID_plans);
export const create_Plan = AsyncFunctionThunk('create_Plans', create_plans);
export const upload_Plans_Images = AsyncFunctionThunk('upload_Plans_Image', upload_plans_Image);
export const delete_Plan = AsyncFunctionThunk('delete_Plans', delete_plans);
export const update_Plan = AsyncFunctionThunk('update_Plans', update_plans);
// export const getByCategory_Tag_SubCategorys = AsyncFunctionThunk('getByCategory_Tag_SubCategory', getByCategory_Tag_SubCategory);


 
const PlanSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Plan.fulfilled, (state, action) => {
        
        state.modes = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_Plan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Plan.rejected, (state, action) => {
        state.loading = false;
      })




      .addCase(getbyID_Plan.fulfilled, (state, action) => {
        console.log(action.payload)
        state.mode = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_Plan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Plan.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_Plan.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(delete_Plan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Plan.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_Plan.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(create_Plan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_Plan.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images 
       .addCase(upload_Plans_Images.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(upload_Plans_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Plans_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_Plan.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(update_Plan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Plan.rejected, (state, action) => {
        state.loading = false;
        
      })

       // getByCategory_Tag_SubCategorys
      //  .addCase(getByCategory_Tag_SubCategorys.fulfilled, (state, action) => {
      //   state.modesWithAdmin = action.payload;
      //   state.loading = false;
      // })
      // .addCase(getByCategory_Tag_SubCategorys.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(getByCategory_Tag_SubCategorys.rejected, (state, action) => {
      //   state.loading = false;
        
      // })
  },
});

export default PlanSlice.reducer;
