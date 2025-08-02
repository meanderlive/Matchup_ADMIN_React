import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createSubscriptionApi, deleteSubscriptionApi, getAllSubscriptionApi, searchSubscription, sortSubscription, updateSubscription } from "../Api/Subscription";

interface SubscriptionState {
  Subscription: any[]; // Replace 'any' with the actual type of your Subscription items
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  Subscription: [],
  loading: false,
  error: null,
};

export const createSubscription = createAsyncThunk<SubscriptionState[], any>(
    'Subscription/createSubscription',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await createSubscriptionApi(data);
        return response.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  
  );
  
  export const getAllSubscription = createAsyncThunk(
    'Subscription/getAllSubscription',
    async(modeid :any)=>{
      try {
        const response: AxiosResponse<any, any> | undefined = await getAllSubscriptionApi(modeid );
        return response.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }

  )
  export const deleteSubscriptionSlice = createAsyncThunk<SubscriptionState[], any>(
    'Subscription/deleteSubscriptionSlice',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await deleteSubscriptionApi(id);
        return response.data.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
  
  export const updateSubscriptionSlice = createAsyncThunk<SubscriptionState[], any>(
    'Subscription/updateSubscriptionSlice',
    async (data: any) => {
      try {
        const response= await updateSubscription(data);
        console.log(response)
        return response ;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );

   // search 
   export const fetchsearchSubscription = createAsyncThunk<SubscriptionState[], any>(
    'Subscription/fetchsearchSubscription',
    async (data: any) => {
      try {
        const response:any= await searchSubscription(data);
        console.log(response.data);
        return response ;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );

   // sortUser
   export const fetchsortSubscription = createAsyncThunk<SubscriptionState[], any>(
    'Subscription/fetchsortSubscription',
    async (sort: any) => {
      try {
        const response:any= await sortSubscription(sort);
        console.log(response.data);
        return response ;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
 const SubscriptionSlice = createSlice({
  name: 'SubscriptionSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createSubscription.fulfilled, (state, action: any) => {
        console.log(action.payload)
    //   state.Subscription.push(action.payload);
      state.loading = false
    })
    .addCase(createSubscription.pending, (state, action: PayloadAction<any>) => {

        state.loading = true
      })
    .addCase(createSubscription.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    .addCase(getAllSubscription.fulfilled, (state, action: PayloadAction<any>) => {
        state.Subscription= action.payload
        state.loading = false
      })
    .addCase(getAllSubscription.pending, (state, action: PayloadAction<any>) => {
  
          state.loading = true
     })
    .addCase(getAllSubscription.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
    })
    .addCase(deleteSubscriptionSlice.fulfilled, (state, action:any) => {
        console.log(action.payload._id)
        // const alldata= state.Subscription.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        // state.Subscription = alldata
        state.loading = false;
      })
       // search
       .addCase(fetchsearchSubscription.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.Subscription = action.payload;
        state.loading = false;
      })

      // fetchsortUser
      .addCase(fetchsortSubscription.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.Subscription = action.payload;
        state.loading = false;
      })

  },
});
export default SubscriptionSlice.reducer;
