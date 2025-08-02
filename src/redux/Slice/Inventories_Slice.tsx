import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import  { getAll_Inventories, getbyID_Inventories, create_Inventories,
  delete_Inventories, update_Inventories,upload_Inventories_Image,stock_Update}  from "../Api/Inventories_Api";

// 
 
 
 
const initialState = {
  Inventories: [],
  Inventorie: {},
  modesWithAdmin:[],
  loading: false,
  error: null,
}; 



const AsyncFunctionThunk = (name: string, apiFunction: any) => {
  return createAsyncThunk<any, any>(
    `Inventorie/${name}`,
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
 
export const getAll_Inventorie = AsyncFunctionThunk('getAll_Plans', getAll_Inventories);
export const getbyID_Inventorie = AsyncFunctionThunk('getbyID_Plans', getbyID_Inventories);
export const create_Inventorie = AsyncFunctionThunk('create_Plans', create_Inventories);
export const upload_Inventorie_Images = AsyncFunctionThunk('upload_Plans_Image', upload_Inventories_Image);
export const delete_Inventorie = AsyncFunctionThunk('delete_Plans', delete_Inventories);
export const update_Inventorie = AsyncFunctionThunk('update_Plans', update_Inventories);
export const update_stock = AsyncFunctionThunk('stock_Update', stock_Update);
// export const getByCategory_Tag_SubCategorys = AsyncFunctionThunk('getByCategory_Tag_SubCategory', getByCategory_Tag_SubCategory);


 
const InventorieSlice = createSlice({
  name: 'InventorieSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll_Inventorie.fulfilled, (state, action) => {
        
        state.Inventories = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getAll_Inventorie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAll_Inventorie.rejected, (state, action) => {
        state.loading = false;
      })




      .addCase(getbyID_Inventorie.fulfilled, (state, action) => {
        console.log(action.payload)
        state.Inventorie = action.payload;

        // state.users.push(...action.payload);
        state.loading = false;
      })
      .addCase(getbyID_Inventorie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getbyID_Inventorie.rejected, (state, action) => {
        state.loading = false;
      })
    // Inventorie_Patch
      .addCase(update_stock.fulfilled, (state, action) => {
        state.Inventorie = action.payload;
        state.loading = false;
      })
      .addCase(update_stock.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_stock.rejected, (state, action) => {
        state.loading = false;
        
      })
      
      // delete_Inventorie
      .addCase(delete_Inventorie.fulfilled, (state, action) => {
        state.Inventorie = action.payload;
        state.loading = false;
      })
      .addCase(delete_Inventorie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delete_Inventorie.rejected, (state, action) => {
        state.loading = false;
        
      })
    
      // create_Inventorie 
      .addCase(create_Inventorie.fulfilled, (state, action) => {
        state.Inventorie = action.payload;
        state.loading = false;
      })
      .addCase(create_Inventorie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(create_Inventorie.rejected, (state, action) => {
        state.loading = false;
        
      })


       // upload_images_Inventorie 
       .addCase(upload_Inventorie_Images.fulfilled, (state, action) => {
        state.Inventorie = action.payload;
        state.loading = false;
      })
      .addCase(upload_Inventorie_Images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(upload_Inventorie_Images.rejected, (state, action) => {
        state.loading = false;
        
      })

      // update_Inventorie
       .addCase(update_Inventorie.fulfilled, (state, action) => {
        state.Inventorie = action.payload;
        state.loading = false;
      })
      .addCase(update_Inventorie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update_Inventorie.rejected, (state, action) => {
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

export default InventorieSlice.reducer;
