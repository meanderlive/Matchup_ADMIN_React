
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createActivityApi, deleteActivityApi, getBySenderUserId, searchActivity, sortActivity, updateActivity } from "../Api/Activity";

interface ActivityState {
  Activity: any[]; // Replace 'any' with the actual type of your Activity items
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  Activity: [],
  loading: false,
  error: null,
};

export const createActivity = createAsyncThunk<ActivityState[], any>(
    'Activity/createActivity',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any>  = await createActivityApi(data);
        return response.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  
  );
  
  export const getBySenderUserIds = createAsyncThunk(
    'Activity/getBySenderUserIds',
    async(Data :any)=>{
      try {
        const response: AxiosResponse<any, any>  = await getBySenderUserId(Data );
        return response.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }

  )
  export const deleteActivitySlice = createAsyncThunk<ActivityState[], any>(
    'Activity/deleteActivitySlice',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any>   = await deleteActivityApi(id);
        return response.data.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
  
  export const updateActivitySlice = createAsyncThunk<ActivityState[], any>(
    'Activity/updateActivitySlice',
    async (data: any) => {
      try {
        const response= await updateActivity(data);
        console.log(response)
        return response ;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );

   // search 
   export const fetchsearchActivity = createAsyncThunk<ActivityState[], any>(
    'Activity/fetchsearchActivity',
    async (data: any) => {
      try {
        const response:any= await searchActivity(data);
        console.log(response.data);
        return response ;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );

   // sortUser
   export const fetchsortActivity = createAsyncThunk<ActivityState[], any>(
    'Activity/fetchsortActivity',
    async (sort: any) => {
      try {
        const response:any= await sortActivity(sort);
        console.log(response.data);
        return response ;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
 const ActivitySlice = createSlice({
  name: 'ActivitySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createActivity.fulfilled, (state, action: any) => {
        console.log(action.payload)
    //   state.Activity.push(action.payload);
      state.loading = false
    })
    .addCase(createActivity.pending, (state, action: PayloadAction<any>) => {

        state.loading = true
      })
    .addCase(createActivity.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    .addCase(getBySenderUserIds.fulfilled, (state, action: PayloadAction<any>) => {
        state.Activity= action.payload
        state.loading = false
      })
    .addCase(getBySenderUserIds.pending, (state, action: PayloadAction<any>) => {
  
          state.loading = true
     })
    .addCase(getBySenderUserIds.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
    })
    .addCase(deleteActivitySlice.fulfilled, (state, action:any) => {
        console.log(action.payload._id)
        // const alldata= state.Activity.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        // state.Activity = alldata
        state.loading = false;
      })
       // search
       .addCase(fetchsearchActivity.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.Activity = action.payload;
        state.loading = false;
      })

      // fetchsortUser
      .addCase(fetchsortActivity.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.Activity = action.payload;
        state.loading = false;
      })

  },
});
export default ActivitySlice.reducer;
