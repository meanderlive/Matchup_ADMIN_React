import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {  createProfile, createPeta, deletePet, getAllPet, searchPet, sortPet, updatePet,getbyidPet, searchPetbyAge,petGetbyUserId, RemoveImageintoGallery, uploadGalleryImage } from "../Api/PetApi";

interface Pet {
    _id:string;
  name: string;
  password: string;
  email: string;
  DOB: string;
  phone_number: string;
  mode: string;
  iAm: "Male" | "Female";
  looking: "Male" | "Female";
  marial: "Single" | "Married";
  status: "active" | "inactive";
  city: string;
}

interface PetState {
  Pets: Pet[];
  Pet: any;
  page:any;
  loading: boolean;
  error: null | string;
}

const initialState: PetState = {
  Pets: [],
  Pet:[],
  page:1,
  loading: false,
  error: null,
};

export const createPet = createAsyncThunk<Pet[], any>(
  'Pet/createPet',
  async (data: any) => {
    const {values,avatarFil}=data
    try {
      const response: AxiosResponse<any, any> | undefined = await createPeta(values);
      const imageid = response.data.data._id
      if(response.data.isSuccess){
        createProfile({imageid,avatarFil})
      }
      return response.data as Pet[];
    } catch (error) {
      console.error("Error creating Pet:", error);
      throw error;
    }
  }
);


export const uploadGalleryImages = createAsyncThunk<Pet[], any>(
  'Pet/uploadGalleryImages',
  async (data: any) => {
    const {id,avatarFil}=data
    try {
       
    const response :any= await  uploadGalleryImage({id,avatarFil})
      
      return response ;
    } catch (error) {
      console.error("Error creating Pet:", error);
      throw error;
    }
  }
);



export const fetchPet = createAsyncThunk<Pet[], any>(
  'Pet/fetchPet',
  async (data:any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await getAllPet(data);
      return response.data as Pet[];
    } catch (error) {
      console.error("Error fetching Pets:", error);
      throw error;
    }
  }
);

export const getbyidPets = createAsyncThunk<Pet[], any>(
  'Pet/getbyidPets',
  async (data:any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await getbyidPet(data);
      return response.data as Pet[];
    } catch (error) {
      console.error("Error fetching Pets:", error);
      throw error;
    }
  }
);
export const petGetbyUserIds = createAsyncThunk<Pet[], any>(
  'Pet/petGetbyUserIds',
  async (data:any) => {
    try {
      const response: AxiosResponse<any, any> | undefined = await petGetbyUserId(data);
      return response.data as Pet[];
    } catch (error) {
      console.error("Error fetching Pets:", error);
      throw error;
    }
  }
);
export const fetchdeletePet = createAsyncThunk<Pet[], any>(
    'Pet/fetchdeletePet',
    async (id: any) => {
      try {
        const response: AxiosResponse<any, any> | undefined = await deletePet(id);
        return response.data as Pet[];
      } catch (error) {
        console.error("Error fetching Pets:", error);
        throw error;
      }
    }
  );


  
  export const fetchupdatePet = createAsyncThunk<Pet[], any>(
    'Pet/fetchdeletePet',
    async (data:any) => {
      
      try {
        const response= await updatePet(data);
        return response.data as Pet[];
      } catch (error) {
        console.error("Error fetching Pets:", error);
        throw error;
      }
    }
  );

  export const RemoveImageintoGallerys = createAsyncThunk<Pet[], any>(
    'Pet/RemoveImageintoGallerys',
    async (data:any) => {
      const {id ,item}=data
      
      try {
        const response = await RemoveImageintoGallery(data);

        
        return response as any;
      } catch (error) {
        console.error("Error fetching Pets:", error);
        throw error;
      }
    }
  );
  // search 
  export const fetchsearchPet = createAsyncThunk<Pet[], any>(
    'Pet/fetchsearchPet',
    async (data: any) => {
      try {
        const response:any= await searchPet(data);
        return response as Pet[];
      } catch (error) {
        console.error("Error creating Pet:", error);
        throw error;
      }
    }
  );
  export const searchPetbyAges = createAsyncThunk<Pet[], any>(
    'Pet/searchPetbyAges',
    async (data: any) => {
 
      try {
        const response:any= await searchPetbyAge(data);
        return response as Pet[];
      } catch (error) {
        console.error("Error creating Pet:", error);
        throw error;
      }
    }
  );
  // sortPet
  export const fetchsortPet = createAsyncThunk<Pet[], any>(
    'Pet/fetchsortPet',
    async (sort: any) => {
      try {
        const response:any= await sortPet(sort);
        return response as Pet[];
      } catch (error) {
        console.error("Error creating Pet:", error);
        throw error;
      }
    }
  );
const PetSlice:any = createSlice({
  name: 'PetSlice',
  initialState,
  reducers: {
    setPage:(state,action)=>{
      state.page=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPet.fulfilled, (state, action:any) => {
        // state.Pets = action.payload;

        state.loading = false;
      })
      .addCase(createPet.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPet.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
      .addCase(fetchPet.fulfilled, (state, action) => {
        state.Pets = action.payload;
        state.loading = false;
      })
      .addCase(getbyidPets.fulfilled, (state, action) => {
        state.Pet = action.payload;
        state.loading = false;
      })

      // pet Get by UserIds case
      .addCase(petGetbyUserIds.fulfilled, (state, action) => {
        state.Pets = action.payload;
        state.loading = false;
      })
      .addCase(petGetbyUserIds.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(petGetbyUserIds.rejected, (state, action) => {
        state.loading = false;
        state.error = "error";
      })
    //   delete
      .addCase(fetchdeletePet.fulfilled, (state, action) => {
        // const alldata= state.Pets.filter((items:any)=>items._id!==action.payload._id)
        // state.Pets.push(...action.payload);
        state.loading = false;
      })
      // search
      .addCase(fetchsearchPet.fulfilled,(state,action)=>{
        state.Pets = action.payload;
        state.loading = false;
      })
       // Filter by age
       .addCase(searchPetbyAges.fulfilled,(state,action)=>{
        state.Pets = action.payload;
        state.loading = false;
      })
      // fetchsortPet
      .addCase(fetchsortPet.fulfilled,(state,action)=>{
        state.Pets = action.payload;
        state.loading = false;
      })
      .addCase(RemoveImageintoGallerys.fulfilled,(state,action)=>{
       
        state.loading = false;
      })
  },
});
export const { setPage } = PetSlice.actions

export default PetSlice.reducer;
