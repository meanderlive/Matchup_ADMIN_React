
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createCompatibilityApi, deleteCompatibilityApi,getAllCompatibilityApi,  searchCompatibility, sortCompatibility, updateCompatibility } from "../Api/Compatibility";

interface CompatibilityState {
  Compatibility: any[]; // Replace 'any' with the actual type of your Compatibility items
  loading: boolean;
  error: string | null;
}

const initialState: CompatibilityState = {
  Compatibility: [],
  loading: false,
  error: null,
};

export const createCompatibility = createAsyncThunk<CompatibilityState[], any>(
    'Compatibility/createCompatibility',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any>  = await createCompatibilityApi(data);
        return response.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  
  );
  

  export const deleteCompatibilitySlice = createAsyncThunk<CompatibilityState[], any>(
    'Compatibility/deleteCompatibilitySlice',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any>   = await deleteCompatibilityApi(id);
        return response.data.data
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
  
  export const updateCompatibilitySlice = createAsyncThunk<CompatibilityState[], any>(
    'Compatibility/updateCompatibilitySlice',
    async (data: any) => {
      try {
        const response= await updateCompatibility(data);
        console.log(response)
        return response ;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );

  // get all 
  export const getAllCompatibilityApis = createAsyncThunk<CompatibilityState[], any>(
    'Compatibility/getAllCompatibilityApis',
    async (data: any) => {
      try {
        const response:any= await getAllCompatibilityApi(data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );

   // search 
   export const fetchsearchCompatibility = createAsyncThunk<CompatibilityState[], any>(
    'Compatibility/fetchsearchCompatibility',
    async (data: any) => {
      try {
        const response:any= await searchCompatibility(data);
        console.log(response.data);
        return response ;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );

   // sortUser
   export const fetchsortCompatibility = createAsyncThunk<CompatibilityState[], any>(
    'Compatibility/fetchsortCompatibility',
    async (sort: any) => {
      try {
        const response:any= await sortCompatibility(sort);
        console.log(response.data);
        return response ;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
 const CompatibilitySlice :any = createSlice({
  name: 'CompatibilitySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createCompatibility.fulfilled, (state, action: any) => {
        console.log(action.payload)
    //   state.Compatibility.push(action.payload);
      state.loading = false
    })
    .addCase(createCompatibility.pending, (state, action: PayloadAction<any>) => {

        state.loading = true
      })
    .addCase(createCompatibility.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    
    .addCase(deleteCompatibilitySlice.fulfilled, (state, action:any) => {
        console.log(action.payload._id)
        // const alldata= state.Compatibility.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        // state.Compatibility = alldata
        state.loading = false;
      })
       // search
       .addCase(fetchsearchCompatibility.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.Compatibility = action.payload;
        state.loading = false;
      })
      // get all 
      .addCase(getAllCompatibilityApis.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.Compatibility = action.payload;
        state.loading = false;
      })

      // fetchsortUser
      .addCase(fetchsortCompatibility.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.Compatibility = action.payload;
        state.loading = false;
      })

  },
});
export default CompatibilitySlice.reducer;
