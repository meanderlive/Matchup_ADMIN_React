import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_Booking, getbyID_Booking, create_Booking,
  delete_Booking, update_Booking,upload_Booking_Image}  from "../Api/Booking_Api";

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
 
export const getAll_Bookings = AsyncFunctionThunk('getAll_Booking', getAll_Booking);
export const getbyID_Bookings = AsyncFunctionThunk('getbyID_Booking', getbyID_Booking);
export const create_Bookings = AsyncFunctionThunk('create_Booking', create_Booking);
export const upload_Booking_Images = AsyncFunctionThunk('upload_Booking_Image', upload_Booking_Image);
export const delete_Bookings = AsyncFunctionThunk('delete_Booking', delete_Booking);
export const update_Bookings = AsyncFunctionThunk('update_Booking', update_Booking);
// export const getByCategory_Tag_SubCategorys = AsyncFunctionThunk('getByCategory_Tag_SubCategory', getByCategory_Tag_SubCategory);


 
const BookingSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Bookings.fulfilled, (state, action) => {
        
        state.modes = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_Bookings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Bookings.rejected, (state, action) => {
        state.loading = false;
      })




      .addCase(getbyID_Bookings.fulfilled, (state, action) => {
        console.log(action.payload)
        state.mode = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_Bookings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Bookings.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_Bookings.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(delete_Bookings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Bookings.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_Bookings.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(create_Bookings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_Bookings.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images 
       .addCase(upload_Booking_Images.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(upload_Booking_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Booking_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_Bookings.fulfilled, (state, action) => {
        state.mode = action.payload;
        state.loading = false;
      })
      .addCase(update_Bookings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Bookings.rejected, (state, action) => {
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

export default BookingSlice.reducer;
