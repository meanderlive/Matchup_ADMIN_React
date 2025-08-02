import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_Payment, getbyID_Payment, create_Payment,
  delete_Payment, update_Payment,upload_Payment_Image}  from "../Api/Payments_Api";

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
 
export const getAll_Payments = AsyncFunctionThunk('getAll_Payment', getAll_Payment);
export const getbyID_Payments = AsyncFunctionThunk('getbyID_Payment', getbyID_Payment);
export const create_Payments = AsyncFunctionThunk('create_Payment', create_Payment);
export const upload_Payment_Images = AsyncFunctionThunk('upload_Payment_Image', upload_Payment_Image);
export const delete_Payments = AsyncFunctionThunk('delete_Payment', delete_Payment);
export const update_Payments = AsyncFunctionThunk('update_Payment', update_Payment);
// export const getByCategory_Tag_SubCategorys = AsyncFunctionThunk('getByCategory_Tag_SubCategory', getByCategory_Tag_SubCategory);


 
const PaymentsSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Payments.fulfilled, (state, action) => {
        
        state.modes = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_Payments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Payments.rejected, (state, action) => {
        state.loading = false;
      })




      .addCase(getbyID_Payments.fulfilled, (state, action) => {
        console.log(action.payload)
        state.mode = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_Payments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Payments.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_Payments.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(delete_Payments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Payments.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_Payments.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(create_Payments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_Payments.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images 
       .addCase(upload_Payment_Images.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(upload_Payment_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Payment_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_Payments.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(update_Payments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Payments.rejected, (state, action) => {
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
