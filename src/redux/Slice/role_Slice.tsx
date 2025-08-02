import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  {create_role, delete_Role, getAllroles, update_Role}  from "../Api/role";
import { RoleState } from "../../InterFace/InterFace";

// 

const initialState:RoleState = {
  roles: [],
  role: {},
  loading: false,
  error: null,
};





const AsyncFunctionThunk = (name: string, apiFunction: any) => {
  return createAsyncThunk<any, any>(
    `role/${name}`,
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any> = await apiFunction(data);
        return response.data;
      } catch (error) {
        console.error(`Failed to ${name}:`, error);
        throw error;
      }
    }
  ); 
};
 
export const fetchRoles = AsyncFunctionThunk('fetchRoles', getAllroles);
export const create_roles = AsyncFunctionThunk('create_roles', create_role);
export const delete_Roles = AsyncFunctionThunk('delete_Roles', delete_Role);
export const update_Roles = AsyncFunctionThunk('update_Roles', update_Role);





 

const roleSlice = createSlice({
  name: 'roleSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // fetchRoles
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
      })

      // create_roles
      .addCase(delete_Roles.fulfilled, (state, action) => {
        state.role = action.payload;
        state.loading = false;
      })
      .addCase(delete_Roles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Roles.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // delete_Roles
      .addCase(create_roles.fulfilled, (state, action) => {
        state.role = action.payload;
        state.loading = false;
      })
      .addCase(create_roles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_roles.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_Roles
       .addCase(update_Roles.fulfilled, (state, action) => {
        state.role = action.payload;
        state.loading = false;
      })
      .addCase(update_Roles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Roles.rejected, (state, action) => {
        state.loading = false;
        
      })
  },
});

export default roleSlice.reducer;
