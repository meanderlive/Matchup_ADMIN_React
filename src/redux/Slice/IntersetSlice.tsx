import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createIntersetApi, deleteInterestApi, getAllInterestApi, searchInterest, sortInterest, updateInterest } from "../Api/Interset";

interface IntesetState {
  interset: any[]; // Replace 'any' with the actual type of your interset items
  loading: boolean;
  error: string | null;
}

const initialState: IntesetState = {
  interset: [],
  loading: false,
  error: null,
};

export const createInterset = createAsyncThunk<IntesetState[], any>(
    'interset/createInterset',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await createIntersetApi(data);
        return response.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  
  );
  
  export const getAllInterest = createAsyncThunk(
    'interest/getAllInterest',
    async(modeid :any)=>{
      try {
        const response: AxiosResponse<any, any> | undefined = await getAllInterestApi(modeid );
        return response.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }

  )
  export const deleteInterestSlice = createAsyncThunk<IntesetState[], any>(
    'interest/deleteInterestSlice',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await deleteInterestApi(id);
        return response.data.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
  
  export const updateInterestSlice = createAsyncThunk<IntesetState[], any>(
    'interest/updateInterestSlice',
    async (data: any) => {
      try {
        const response= await updateInterest(data);
        console.log(response)
        return response ;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );

   // search 
   export const fetchsearchInterest = createAsyncThunk<IntesetState[], any>(
    'interest/fetchsearchInterest',
    async (data: any) => {
      try {
        const response:any= await searchInterest(data);
        console.log(response.data);
        return response ;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );

   // sortUser
   export const fetchsortInterest = createAsyncThunk<IntesetState[], any>(
    'interest/fetchsortInterest',
    async (sort: any) => {
      try {
        const response:any= await sortInterest(sort);
        console.log(response.data);
        return response ;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
 const intersetSlice = createSlice({
  name: 'intersetSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createInterset.fulfilled, (state, action: any) => {
        console.log(action.payload)
    //   state.interset.push(action.payload);
      state.loading = false
    })
    .addCase(createInterset.pending, (state, action: PayloadAction<any>) => {

        state.loading = true
      })
    .addCase(createInterset.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    .addCase(getAllInterest.fulfilled, (state, action: PayloadAction<any>) => {
        state.interset= action.payload
        state.loading = false
      })
    .addCase(getAllInterest.pending, (state, action: PayloadAction<any>) => {
  
          state.loading = true
     })
    .addCase(getAllInterest.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
    })
    .addCase(deleteInterestSlice.fulfilled, (state, action:any) => {
        console.log(action.payload._id)
        // const alldata= state.interset.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        // state.interset = alldata
        state.loading = false;
      })
       // search
       .addCase(fetchsearchInterest.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.interset = action.payload;
        state.loading = false;
      })

      // fetchsortUser
      .addCase(fetchsortInterest.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.interset = action.payload;
        state.loading = false;
      })

  },
});
export default intersetSlice.reducer;
