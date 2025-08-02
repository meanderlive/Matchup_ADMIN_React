import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import createLogin, { forgotPassword, verifyOTP,Auth_Login_With_Mode,resetPassword } from "../Api/Auth";

// Define the initial state
interface User {
    _id: string;
    email: string;
    password: string;
}

interface UserState {
    user: User[];
    forgotUser: any[];
    loading: boolean;
    auth: boolean;
    error: any;
}

const initialState: UserState = {
    user: [],
    forgotUser: [],
    loading: false,
    auth: false,
    error: null
};

// Generalized async thunk function
const AsyncFunctionThunk = (name: string, apiFunction: any) => {
    return createAsyncThunk<any, any>(
        `auth/${name}`,
        async (data: any, { rejectWithValue }) => {
            try {
                const response: AxiosResponse<any, any> = await apiFunction(data);
                return response.data;
            } catch (error: any) {
                console.error(`Failed to ${name}:`, error);
                if (error.response && error.response.data) {
                    return rejectWithValue(error.response.data);
                }
                return rejectWithValue({ error: error.message });
            }
        }
    );
};

// Define async thunks for each operation
export const createLoginSlice = AsyncFunctionThunk('createLogin', createLogin);
export const createForgotSlice = AsyncFunctionThunk('createForgot', forgotPassword);
export const createOTPverfiySlice = AsyncFunctionThunk('verifyOTP', verifyOTP);
export const resetPasswordSlice = AsyncFunctionThunk('resetPassword', resetPassword);
export const Auth_Login_With_Modes = AsyncFunctionThunk('Auth_Login_With_Modes', Auth_Login_With_Mode);


// Create the slice
const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {

      setError: (state,action)=>{
state.error=null
      }
    },
    extraReducers: (builder) => {
        builder
            // createLoginSlice
            .addCase(createLoginSlice.fulfilled, (state, action) => {
                state.user.push(action.payload);
                state.loading = false;
                state.auth = true;
            })
            .addCase(createLoginSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLoginSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // createForgotSlice
            .addCase(createForgotSlice.fulfilled, (state, action) => {
                state.forgotUser = action.payload;
                state.loading = false;
            })
            .addCase(createForgotSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(createForgotSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // createOTPverfiySlice
            .addCase(createOTPverfiySlice.fulfilled, (state) => {
                state.loading = false;
                state.auth = true;
            })
            .addCase(createOTPverfiySlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOTPverfiySlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // resetPaswordSlice
            .addCase(resetPasswordSlice.fulfilled, (state) => {
                state.loading = false;
                state.auth = true;
            })
            .addCase(resetPasswordSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPasswordSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Auth_Login_With_Modes
            .addCase(Auth_Login_With_Modes.fulfilled, (state) => {
              state.loading = false;
              state.auth = true;
          })
          .addCase(Auth_Login_With_Modes.pending, (state) => {
              state.loading = true;
          })
          .addCase(Auth_Login_With_Modes.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
          });
    }
});
export const {setError}=AuthSlice.actions

export default AuthSlice.reducer;
