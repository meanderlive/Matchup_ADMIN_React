import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_Preferences, getbyID_Preferences, create_Preferences,
  delete_Preferences, update_Preferences,upload_Preferences_Image}  from "../Api/Prefrences_Api";

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
 
export const getAll_Preference = AsyncFunctionThunk('getAll_Preferences', getAll_Preferences);
export const getbyID_Preference = AsyncFunctionThunk('getbyID_Preferences', getbyID_Preferences);
export const create_Preference = AsyncFunctionThunk('create_Preferences', create_Preferences);
export const upload_Preferences_Images = AsyncFunctionThunk('upload_Preferences_Image', upload_Preferences_Image);
export const delete_Preference = AsyncFunctionThunk('delete_Preferences', delete_Preferences);
export const update_Preference = AsyncFunctionThunk('update_Preferences', update_Preferences);
// export const getByCategory_Tag_SubCategorys = AsyncFunctionThunk('getByCategory_Tag_SubCategory', getByCategory_Tag_SubCategory);


 
const PaymentsSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Preference.fulfilled, (state, action) => {
        
        state.modes = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_Preference.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Preference.rejected, (state, action) => {
        state.loading = false;
      })




      .addCase(getbyID_Preference.fulfilled, (state, action) => {
        console.log(action.payload)
        state.mode = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_Preference.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Preference.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_Preference.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(delete_Preference.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Preference.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_Preference.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(create_Preference.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_Preference.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images 
       .addCase(upload_Preferences_Images.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(upload_Preferences_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Preferences_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_Preference.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(update_Preference.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Preference.rejected, (state, action) => {
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

export default PaymentsSlice.reducer;
