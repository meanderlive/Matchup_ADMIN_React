
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createblog, deleteblog, getAllblog, updateblog } from "../Api/BlogArticlesPublishing";

interface User {
    _id:string;
    question: string;
    answer: string;
    mode: string;

}

interface UserState {
    blog: User[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
    blog: [],
  loading: false,
  error: null,
};

export const createblogSlice = createAsyncThunk<User[], any>(
  'blog/createblogSlice',
  async (data: any) => {
    try {
      const response: AxiosResponse<any, any>   = await createblog(data);
      console.log(response.data);
      return response.data as User[];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);

export const getallblogSlice= createAsyncThunk<User[], any>(
    'blog/getallblogSlice',
    async (data: any) => {
      try {
        const response: AxiosResponse<any, any>   = await getAllblog(data);
        console.log(response.data.data);
        return response.data.data as User[];
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }
  );
  
  
  export const deleteblogSlice = createAsyncThunk<User[], any>(
    'blog/deleteblogSlice',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any>  = await deleteblog(id);
        return response.data as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
  export const updateblogSlice = createAsyncThunk<User[], any>(
    'blog/updateblogSlice',
    async (data: any) => {
      try {
        const response= await updateblog(data);
        console.log(response)
        return response as User[];
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    }
  );
const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createblogSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.blog.push(action.payload);
        state.loading = false;
      })
      .addCase(createblogSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createblogSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   getall

    .addCase(getallblogSlice.fulfilled, (state, action) => {
        console.log(action.payload)
        state.blog = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getallblogSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallblogSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })

    //   delete

    .addCase(deleteblogSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        const alldata= state.blog.filter((items:any)=>items._id!==action.payload._id)
        // state.users.push(...action.payload);
        state.blog = alldata
        state.loading = false;
      })

      // update
      .addCase(updateblogSlice.fulfilled, (state, action:any) => {
        console.log(action.payload)
        // state.Subscription = action.payload;

        state.blog=action.payload;
        state.loading = false;
      })
      .addCase(updateblogSlice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateblogSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
 
   
     
}});

export default blogSlice.reducer;
