import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createSubscriptionPlans, deleteSubscriptionPlans, getAllSubscriptionPlans, updateSubscriptionPlans } from "../Api/SubscriptionPlans";

interface User {

 
    _id:string;
    planName: string;
    planType: string;
    planPrice: Number;
    planDuration: string;
    planDescription: string;
    mode: string;

}

interface UserState {
    Subscription: User[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
    Subscription: [],
  loading: false,
  error: null,
};

export const createSubscription = createAsyncThunk<User[], any>(
  'Subscription/createSubscription',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await createSubscriptionPlans(data);
      console.log(response.data.data);
      return response.data.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);

export const getallSubscription = createAsyncThunk<User[], any>(
    'Subscription/getallSubscription',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await getAllSubscriptionPlans(data);
        console.log(response.data.data);
        return response.data as User[];
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
  
  export const fetchdeleteSubscription = createAsyncThunk<User[], any>(
    'Subscription/fetchdeleteSubscription',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await deleteSubscriptionPlans(id);
        return response.data as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );

  export const editSubscriptionPlans = createAsyncThunk<User[], any>(
    'Subscription/editSubscriptionPlans',
    async (data: any) => {
      try {
        const response= await updateSubscriptionPlans(data);
        return response.data as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );

  

const SubscriptionPlansSlice = createSlice({
  name: 'SubscriptionPlansSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubscription.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        // state.Subscription.push(action.payload);
        state.loading = false;
      })
      .addCase(createSubscription.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
      .addCase(getallSubscription.fulfilled, (state, action) => {
        console.log(action.payload)
        state.Subscription = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getallSubscription.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
        //   delete
        .addCase(fetchdeleteSubscription.fulfilled, (state, action) => {
            console.log(action.payload)
            // const alldata= state.users.filter((items:any)=>items._id!==action.payload._id)
            // state.users.push(...action.payload);
            state.loading = false;
          })
     
}});

export default SubscriptionPlansSlice.reducer;
