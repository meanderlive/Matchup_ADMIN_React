import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  createLogin, { forgotPassword, verifyOTP }  from "../Api/Auth";


interface User {
    _id:string;
    email:string;
    password:string

}

interface UserState {
    user: User[];
    forgotUser:[];
  loading: boolean;
  auth:boolean;
  error: null | string;
}

const initialState: UserState = {
    user: [],
  loading: false,
  auth:false,
  error: null,
  forgotUser:[]
};

export const createLoginSlice = createAsyncThunk<User[], any>(
  'Auth/createLoginSlice',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await createLogin(data);
      return response.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);

export const createForgotSlice = createAsyncThunk<User[], any>(
  'Auth/createForgotSlice',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await forgotPassword(data);
      return response.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);

export const createOTPverfiySlice = createAsyncThunk<User[], any>(
  'Auth/createOTPverfiySlice',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await verifyOTP(data);
      return response.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);


  
 
 
const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLoginSlice.fulfilled, (state, action:any) => {
        // state.Subscription = action.payload;
console.log(action.payload)
        state.user.push(action.payload);
        state.loading = false;
        state.auth = true
      })
      .addCase(createLoginSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createLoginSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
      .addCase(createForgotSlice.fulfilled, (state, action:any) => {
        state.forgotUser = action.payload
        state.loading = false;
      })
      .addCase(createForgotSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createForgotSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
      .addCase(createOTPverfiySlice.fulfilled, (state, action:any) => {
        state.loading = false;
        state.auth = true

      })
      .addCase(createOTPverfiySlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOTPverfiySlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
      
   
     
}});

export default AuthSlice.reducer;
