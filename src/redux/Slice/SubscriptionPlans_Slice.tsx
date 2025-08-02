import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createSubscriptionPlans, deleteSubscriptionPlans, getAllSubscriptionPlans, SubscriptionPlans_Image, updateSubscriptionPlans } from "../Api/SubscriptionPlans";

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
    SubscriptionPlan: any;
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
    SubscriptionPlan: {},
  loading: false,
  error: null,
};

export const createSubscriptionPlan = createAsyncThunk<User[], any>(
  'SubscriptionPlan/createSubscriptionPlan',
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

export const getallSubscriptionPlan = createAsyncThunk<User[], any>(
    'SubscriptionPlan/getallSubscriptionPlan',
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
  
  export const fetchdeleteSubscriptionPlan = createAsyncThunk<User[], any>(
    'SubscriptionPlan/fetchdeleteSubscriptionPlan',
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
    'SubscriptionPlan/editSubscriptionPlans',
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
  export const SubscriptionPlans_Images = createAsyncThunk<User[], any>(
    'SubscriptionPlan/SubscriptionPlans_Images',
    async (data: any) => {
      try {
        const response= await SubscriptionPlans_Image(data);
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
      .addCase(createSubscriptionPlan.fulfilled, (state, action:any) => {
        console.log(action.payload)
        state.SubscriptionPlan = action.payload;

        // state.Subscription.push(action.payload);
        state.loading = false;
      })
      .addCase(createSubscriptionPlan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
      .addCase(getallSubscriptionPlan.fulfilled, (state, action) => {
        console.log(action.payload)
        state.SubscriptionPlan = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getallSubscriptionPlan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

      // upload plan image
      .addCase(SubscriptionPlans_Images.fulfilled, (state, action) => {
        console.log(action.payload)
        state.SubscriptionPlan = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(SubscriptionPlans_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(SubscriptionPlans_Images.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })



        //   delete
        .addCase(fetchdeleteSubscriptionPlan.fulfilled, (state, action) => {
            console.log(action.payload)
            // const alldata= state.users.filter((items:any)=>items._id!==action.payload._id)
            // state.users.push(...action.payload);
            state.loading = false;
          })
     
}});

export default SubscriptionPlansSlice.reducer;
