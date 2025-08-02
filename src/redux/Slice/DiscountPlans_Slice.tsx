import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_Disconutplans, getbyID_Disconutplans, create_Disconutplans,
  delete_Disconutplans, update_Disconutplans,upload_Disconutplans_Image}  from "../Api/DiscountPlan_Api";

// 
 
 
 
const initialState = {
  Disconutplans: [],
  Disconutplan: {},
  modesWithAdmin:[],
  loading: false,
  error: null,
}; 



const AsyncFunctionThunk = (name: string, apiFunction: any) => {
  return createAsyncThunk<any, any>(
    `Disconutplan/${name}`,
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
 
export const getAll_Disconutplan = AsyncFunctionThunk('getAll_Plans', getAll_Disconutplans);
export const getbyID_Disconutplan = AsyncFunctionThunk('getbyID_Plans', getbyID_Disconutplans);
export const create_Disconutplan = AsyncFunctionThunk('create_Plans', create_Disconutplans);
export const upload_Disconutplan_Images = AsyncFunctionThunk('upload_Plans_Image', upload_Disconutplans_Image);
export const delete_Disconutplan = AsyncFunctionThunk('delete_Plans', delete_Disconutplans);
export const update_Disconutplan = AsyncFunctionThunk('update_Plans', update_Disconutplans);
// export const getByCategory_Tag_SubCategorys = AsyncFunctionThunk('getByCategory_Tag_SubCategory', getByCategory_Tag_SubCategory);


 
const DisconutplansSlice = createSlice({
  name: 'DisconutplansSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Disconutplan.fulfilled, (state, action) => {
        
        state.Disconutplans = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_Disconutplan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Disconutplan.rejected, (state, action) => {
        state.loading = false;
      })




      .addCase(getbyID_Disconutplan.fulfilled, (state, action) => {
        console.log(action.payload)
        state.Disconutplans = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_Disconutplan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Disconutplan.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_Disconutplan.fulfilled, (state, action) => {
        state.Disconutplans = action.payload;
        state.loading = false;
      })
      .addCase(delete_Disconutplan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Disconutplan.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_Disconutplan.fulfilled, (state, action) => {
        state.Disconutplans = action.payload;
        state.loading = false;
      })
      .addCase(create_Disconutplan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_Disconutplan.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images 
       .addCase(upload_Disconutplan_Images.fulfilled, (state, action) => {
        state.Disconutplans = action.payload;
        state.loading = false;
      })
      .addCase(upload_Disconutplan_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Disconutplan_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_Disconutplan.fulfilled, (state, action) => {
        state.Disconutplan = action.payload;
        state.loading = false;
      })
      .addCase(update_Disconutplan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Disconutplan.rejected, (state, action) => {
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

export default DisconutplansSlice.reducer;
