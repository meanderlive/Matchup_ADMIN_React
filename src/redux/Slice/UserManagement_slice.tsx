import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {  createProfile, createUsera, deleteUser, getAlluser, searchUser, sortUser, updateUser,getbyiduser, searchUserbyAge, RemoveImageintoGallery, uploadGalleryImage } from "../Api/UserManagement";

 
interface UserState {
  users: any;
  user: any;
  page:any;
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  users: [],
  user:[],
  page:1,
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk<any, any>(
  'user/createUser',
  async (data: any) => {
    const {values,avatarFil}=data
    try {
      const response: AxiosResponse<any, any> | undefined = await createUsera(values);
      const imageid = response.data.data._id
      if(response.data.isSuccess){
        createProfile({imageid,avatarFil})
      }
      return response.data as any;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);


export const uploadGalleryImages = createAsyncThunk<any, any>(
  'user/uploadGalleryImages',
  async (data: any) => {
    const {id,avatarFil}=data
    try {
       
    const response :any= await  uploadGalleryImage({id,avatarFil})
      
      return response ;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);



export const fetchUser = createAsyncThunk<any, any>(
  'user/fetchUser',
  async (data:any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await getAlluser(data);
      return response.data as any;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
);

export const getbyidusers = createAsyncThunk<any, any>(
  'user/getbyidusers',
  async (data:any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await getbyiduser(data);
      return response.data as any;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
);
export const fetchdeleteUser = createAsyncThunk<any, any>(
    'user/fetchdeleteUser',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await deleteUser(id);
        return response.data as any;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );


  
  export const fetchupdateUser = createAsyncThunk<any, any>(
    'user/fetchdeleteUser',
    async (data:any) => {
      
      try {
        const response= await updateUser(data);
        return response.data as any;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );

  export const RemoveImageintoGallerys = createAsyncThunk<any, any>(
    'user/RemoveImageintoGallerys',
    async (data:any) => {
      const {id ,item}=data
      
      try {
        const response = await RemoveImageintoGallery(data);

        
        return response as any;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
  // search 
  export const fetchsearchUser = createAsyncThunk<any, any>(
    'user/fetchsearchUser',
    async (data: any) => {
      try {
        const response:any= await searchUser(data);
        return response as any;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
  export const searchUserbyAges = createAsyncThunk<any, any>(
    'user/searchUserbyAges',
    async (data: any) => {
 
      try {
        const response:any= await searchUserbyAge(data);
        return response as any;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
  // sortUser
  export const fetchsortUser = createAsyncThunk<any, any>(
    'user/fetchsortUser',
    async (sort: any) => {
      try {
        const response:any= await sortUser(sort);
        return response as any;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
const userSlice:any = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setPage:(state,action)=>{
      state.page=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action:any) => {
        // state.users = action.payload;

        state.loading = false;
      })
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getbyidusers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
    //   delete
      .addCase(fetchdeleteUser.fulfilled, (state, action) => {
        // const alldata= state.users.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        state.loading = false;
      })
      // search
      .addCase(fetchsearchUser.fulfilled,(state,action)=>{
        state.users = action.payload;
        state.loading = false;
      })
       // Filter by age
       .addCase(searchUserbyAges.fulfilled,(state,action)=>{
        state.users = action.payload;
        state.loading = false;
      })
      // fetchsortUser
      .addCase(fetchsortUser.fulfilled,(state,action)=>{
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(RemoveImageintoGallerys.fulfilled,(state,action)=>{
       
        state.loading = false;
      })
  },
});
export const { setPage } = userSlice.actions

export default userSlice.reducer;
