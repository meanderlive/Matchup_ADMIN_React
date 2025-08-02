import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_Subscriptions, getbyID_Subscriptions, create_Subscriptions,
    delete_Subscriptions, update_Subscriptions,upload_Subscriptions_Image}  from "../Api/Subscriptions_Api";

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
 
export const getAll_Subscription = AsyncFunctionThunk('getAll_Subscriptions', getAll_Subscriptions);
export const getbyID_Subscription = AsyncFunctionThunk('getbyID_Subscriptions', getbyID_Subscriptions);
export const create_Subscription = AsyncFunctionThunk('create_Subscriptions', create_Subscriptions);
export const delete_Subscription = AsyncFunctionThunk('delete_Subscriptions', delete_Subscriptions);
export const update_Subscription = AsyncFunctionThunk('update_Subscriptions', update_Subscriptions);
export const upload_Subscriptions_Images = AsyncFunctionThunk('upload_Subscriptions_Image', upload_Subscriptions_Image);


 
const Subscriptions_Slice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Subscription.fulfilled, (state, action) => {
        
        state.modes = action.payload;

        state.loading = false;
      })
      .addCase(getAll_Subscription.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Subscription.rejected, (state, action) => {
        state.loading = false;
      })

      //  by id

      .addCase(getbyID_Subscription.fulfilled, (state, action) => {
        console.log(action.payload)
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(getbyID_Subscription.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Subscription.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_Subscription.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(delete_Subscription.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Subscription.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_Subscription.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(create_Subscription.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_Subscription.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images 
       .addCase(upload_Subscriptions_Images.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(upload_Subscriptions_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Subscriptions_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_Subscription.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(update_Subscription.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Subscription.rejected, (state, action) => {
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

export default Subscriptions_Slice.reducer;
