import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createFaq, deleteFaq, getAllFaq, updateFaq } from "../Api/Faq";

interface User {
    _id:string;
    question: string;
    answer: string;
    mode: string;

}

interface UserState {
    Faq: User[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
    Faq: [],
  loading: false,
  error: null,
};

export const createFaqSlice = createAsyncThunk<User[], any>(
  'Faq/createFaqSlice',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await createFaq(data);
      console.log(response.data);
      return response.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);

export const getallFaqSlice= createAsyncThunk<User[], any>(
    'Faq/getallFaqSlice',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await getAllFaq(data);
        console.log(response.data.data);
        return response.data.data as User[];
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
  
  
  export const deleteFaqSlice = createAsyncThunk<User[], any>(
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
  export const updateFaqSlice = createAsyncThunk<User[], any>(
    'Faq/updateFaqSlice',
    async (data: any) => {
      try {
        const response= await updateFaq(data);
        console.log(response)
        return response as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
const FaqSlice = createSlice({
  name: 'FaqSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFaqSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.Faq.push(action.payload);
        state.loading = false;
      })
      .addCase(createFaqSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createFaqSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   getall

    .addCase(getallFaqSlice.fulfilled, (state, action) => {
        console.log(action.payload)
        state.Faq = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getallFaqSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallFaqSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   delete

    .addCase(deleteFaqSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        const alldata= state.Faq.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        state.Faq = alldata
        state.loading = false;
      })

      // update
      .addCase(updateFaqSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.Faq=action.payload;
        state.loading = false;
      })
      .addCase(updateFaqSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateFaqSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
 
   
     
}});

export default FaqSlice.reducer;
