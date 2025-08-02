import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_Services, getbyID_Services, create_Services,
  delete_Services, update_Services,upload_Services_Image,
  uploadBanners}  from "../Api/Service_API";

// 
 
 
 
const initialState = {
  services: [],
  service: {},
  modesWithAdmin:[],
  loading: false,
  error: null,
};



const AsyncFunctionThunk = (name: string, apiFunction: any) => {
  return createAsyncThunk<any, any>(
    `service/${name}`,
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
 
export const getAll_Service = AsyncFunctionThunk('getAll_Services', getAll_Services);
export const getbyID_Service = AsyncFunctionThunk('getbyID_Services', getbyID_Services);
export const create_Service = AsyncFunctionThunk('create_Services', create_Services);
export const upload_Banner = AsyncFunctionThunk('upload_Banner',uploadBanners);
export const delete_Service = AsyncFunctionThunk('delete_Services', delete_Services);
export const update_Service = AsyncFunctionThunk('update_Services', update_Services);
export const upload_Services_Images = AsyncFunctionThunk('upload_Services_Image', upload_Services_Image);


 
const ServiceSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Service.fulfilled, (state, action) => {
        
        state.services = action.payload;

        state.loading = false;
      })
      .addCase(getAll_Service.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Service.rejected, (state, action) => {
        state.loading = false;
      })

      //  by id

      .addCase(getbyID_Service.fulfilled, (state, action) => {
        console.log(action.payload)
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(getbyID_Service.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Service.rejected, (state, action) => {
        state.loading = false;
      })
    

      
      // delete_modes
      .addCase(delete_Service.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(delete_Service.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Service.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_modes 
      .addCase(create_Service.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(create_Service.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_Service.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_Banner 
       .addCase(upload_Banner.fulfilled, (state, action) => {
        console.log("Redux State Update:", action.payload);
        state.service = action.payload; 
        state.loading = false;
      })
      
      .addCase(upload_Banner.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Banner.rejected, (state, action) => {
        state.loading = false;
        
      })

       // upload_images 
       .addCase(upload_Services_Images.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(upload_Services_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Services_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_modes
       .addCase(update_Service.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(update_Service.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Service.rejected, (state, action) => {
        state.loading = false;
        
      })

       // getByCategory_Tag_SubCategorys
      //  .addCase(getByCategory_Tag_SubCategorys.fulfilled, (state, action) => {
      //   state.modesWithAdmin = action.payload;
      //   state.loading = false;
      // })
      // .addCase(getByCategory_Tag_SubCategorys.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(getByCategory_Tag_SubCategorys.rejected, (state, action) => {
      //   state.loading = false;
        
      // })
  },
});

export default ServiceSlice.reducer;
