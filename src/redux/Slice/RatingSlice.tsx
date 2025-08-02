import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createFaq, deleteFaq, getAllFaq, updateFaq } from "../Api/Faq";
import { createRating, getAllRating } from "../Api/Rating";

interface User {

 
    _id:string;
    feeeback: string;
    user: string;
    mode: string;

}

interface UserState {
    Rating: User[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
    Rating: [],
  loading: false,
  error: null,
};

export const createRatingSlice = createAsyncThunk<User[], any>(
  'Rating/createRatingSlice',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await createRating(data);
      console.log(response.data);
      return response.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);

export const getallRatingSlice= createAsyncThunk<User[], any>(
    'Rating/getallRatingSlice',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await getAllRating(data);
        console.log(response.data.data);
        return response.data.data as User[];
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
  
  
  export const deleteRatingSlice = createAsyncThunk<User[], any>(
    'Faq/deleteFaqSlice',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await deleteFaq(id);
        return response.data as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
 
const RatingSlice = createSlice({
  name: 'RatingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRatingSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.Rating.push(action.payload);
        state.loading = false;
      })
      .addCase(createRatingSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createRatingSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   getall

    .addCase(getallRatingSlice.fulfilled, (state, action) => {
        console.log(action.payload)
        state.Rating = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getallRatingSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallRatingSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   delete

   
     
}});

export default RatingSlice.reducer;
