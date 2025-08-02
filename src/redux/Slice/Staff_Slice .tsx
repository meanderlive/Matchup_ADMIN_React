import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_demstaff, getbyID_demstaff, create_demstaff,
  delete_demstaff, update_demstaff,upload_demstaff_Image}  from "../Api/Staff_Api";

// 
 
 
 
const initialState = {
  Demstaff: [],
  demstaff: {},
  modesWithAdmin:[],
  loading: false,
  error: null,
}; 



const AsyncFunctionThunk = (name: string, apiFunction: any) => {
  return createAsyncThunk<any, any>(
    `demstaff/${name}`,
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
 
export const getAll_demstaffs = AsyncFunctionThunk('getAll_Plans', getAll_demstaff);
export const getbyID_demstaffs = AsyncFunctionThunk('getbyID_Plans', getbyID_demstaff);
export const create_demstaffs = AsyncFunctionThunk('create_Plans', create_demstaff);
export const upload_demstaffs_Images = AsyncFunctionThunk('upload_Plans_Image', upload_demstaff_Image);
export const delete_demstaffs = AsyncFunctionThunk('delete_Plans', delete_demstaff);
export const update_demstaffs = AsyncFunctionThunk('update_Plans', update_demstaff);
// export const getByCategory_Tag_SubCategorys = AsyncFunctionThunk('getByCategory_Tag_SubCategory', getByCategory_Tag_SubCategory);


 
const DemstaffSlice = createSlice({
  name: 'demstaffSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_demstaffs.fulfilled, (state, action) => {
        
        state.demstaff = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_demstaffs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_demstaffs.rejected, (state, action) => {
        state.loading = false;
      })




      .addCase(getbyID_demstaffs.fulfilled, (state, action) => {
        console.log(action.payload)
        state.demstaff = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_demstaffs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_demstaffs.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_demstaffs.fulfilled, (state, action) => {
        state.demstaff = action.payload;
        state.loading = false;
      })
      .addCase(delete_demstaffs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_demstaffs.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_demstaffs.fulfilled, (state, action) => {
        state.demstaff = action.payload;
        state.loading = false;
      })
      .addCase(create_demstaffs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_demstaffs.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images 
       .addCase(upload_demstaffs_Images.fulfilled, (state, action) => {
        state.demstaff = action.payload;
        state.loading = false;
      })
      .addCase(upload_demstaffs_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_demstaffs_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_demstaffs.fulfilled, (state, action) => {
        state.demstaff = action.payload;
        state.loading = false;
      })
      .addCase(update_demstaffs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_demstaffs.rejected, (state, action) => {
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

export default DemstaffSlice.reducer;
