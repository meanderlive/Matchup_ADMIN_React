import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createtermsAndConditions, deletetermsAndConditions, getAlltermsAndConditions, updatetermsAndConditions } from "../Api/TermAndCondition";

interface User {
    _id:string;
    question: string;
    answer: string;
    mode: string;

}

interface UserState {
    termsAndConditions: User[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
    termsAndConditions: [],
  loading: false,
  error: null,
};

export const createtermsAndConditionsSlice = createAsyncThunk<User[], any>(
  'termsAndConditions/createtermsAndConditionsSlice',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any> = await createtermsAndConditions(data);
       
      return response.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);

export const getalltermsAndConditionsSlice= createAsyncThunk<User[], any>(
    'termsAndConditions/getalltermsAndConditionsSlice',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> = await getAlltermsAndConditions(data);
 
        return response.data.data as User[];
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
  
  
  export const deletetermsAndConditionsSlice = createAsyncThunk<User[], any>(
    'termsAndConditions/deletetermsAndConditionsSlice',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any>  = await deletetermsAndConditions(id);
        return response.data as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
  export const updatetermsAndConditionsSlice = createAsyncThunk<User[], any>(
    'termsAndConditions/updatetermsAndConditionsSlice',
    async (data: any) => {
      try {
        const response= await updatetermsAndConditions(data);
        console.log(response)
        return response as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
const termsAndConditionsSlice = createSlice({
  name: 'termsAndConditionsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createtermsAndConditionsSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.termsAndConditions.push(action.payload);
        state.loading = false;
      })
      .addCase(createtermsAndConditionsSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createtermsAndConditionsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   getall

    .addCase(getalltermsAndConditionsSlice.fulfilled, (state, action) => {
        console.log(action.payload)
        state.termsAndConditions = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getalltermsAndConditionsSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getalltermsAndConditionsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   delete

    .addCase(deletetermsAndConditionsSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        const alldata= state.termsAndConditions.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        state.termsAndConditions = alldata
        state.loading = false;
      })

      // update
      .addCase(updatetermsAndConditionsSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.termsAndConditions=action.payload;
        state.loading = false;
      })
      .addCase(updatetermsAndConditionsSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatetermsAndConditionsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
 
   
     
}});

export default termsAndConditionsSlice.reducer;
