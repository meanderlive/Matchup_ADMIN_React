import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createPrivecyPolicys, deletePrivecyPolicys, getAllPrivecyPolicys, updatePrivecyPolicys } from "../Api/PrivecyPolicys";

interface User {
    _id:string;
    question: string;
    answer: string;
    mode: string;

}

interface UserState {
    PrivecyPolicys: User[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
    PrivecyPolicys: [],
  loading: false,
  error: null,
};

export const createPrivecyPolicysSlice = createAsyncThunk<User[], any>(
  'PrivecyPolicys/createPrivecyPolicysSlice',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any> = await createPrivecyPolicys(data);
       
      return response.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);

export const getallPrivecyPolicysSlice= createAsyncThunk<User[], any>(
    'PrivecyPolicys/getallPrivecyPolicysSlice',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> = await getAllPrivecyPolicys(data);
 
        return response.data.data as User[];
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
  
  
  export const deletePrivecyPolicysSlice = createAsyncThunk<User[], any>(
    'PrivecyPolicys/deletePrivecyPolicysSlice',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any>  = await deletePrivecyPolicys(id);
        return response.data as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
  export const updatePrivecyPolicysSlice = createAsyncThunk<User[], any>(
    'PrivecyPolicys/updatePrivecyPolicysSlice',
    async (data: any) => {
      try {
        const response= await updatePrivecyPolicys(data);
        console.log(response)
        return response as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
const PrivecyPolicysSlice = createSlice({
  name: 'PrivecyPolicysSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPrivecyPolicysSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.PrivecyPolicys.push(action.payload);
        state.loading = false;
      })
      .addCase(createPrivecyPolicysSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPrivecyPolicysSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   getall

    .addCase(getallPrivecyPolicysSlice.fulfilled, (state, action) => {
        console.log(action.payload)
        state.PrivecyPolicys = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getallPrivecyPolicysSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallPrivecyPolicysSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   delete

    .addCase(deletePrivecyPolicysSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        const alldata= state.PrivecyPolicys.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        state.PrivecyPolicys = alldata
        state.loading = false;
      })

      // update
      .addCase(updatePrivecyPolicysSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.PrivecyPolicys=action.payload;
        state.loading = false;
      })
      .addCase(updatePrivecyPolicysSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePrivecyPolicysSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
 
   
     
}});

export default PrivecyPolicysSlice.reducer;
