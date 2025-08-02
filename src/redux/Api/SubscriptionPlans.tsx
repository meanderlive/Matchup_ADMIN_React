import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const createSubscriptionPlans=async(data:any)=>{
    try {
        const resoponse = await axios.post(`${BaseUrl}subplans/create`,data)
        return resoponse
    } catch (error) {
      console.log(error)
      throw error;       
    }
}

export const getAllSubscriptionPlans=async(data:any)=>{
   
     try {
         const resoponse = await axios.get(`${BaseUrl}subplans/getall?page_number=1&page_size=111`,data)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }

 export const deleteSubscriptionPlans=async(id:any)=>{
   
     try {
         const resoponse = await axios.delete(`${BaseUrl}subplans/deleteSubPlans/${id}`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }
 
 export const updateSubscriptionPlans = async (data: any) => {
    const { editId, values } = data;
    const options = {
      method:'PUT',
      headers: {
        'content-type':'application/json',
        
      },
      body: JSON.stringify(values),
    };
    try {
      const response:any = await fetch(
        `${BaseUrl}subplans/updateSubPlans/${editId}`,
        options
      );
      return response.data; // Fixed the variable name here
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const SubscriptionPlans_Image  = async (data: any) => {
    const { BannerData, editId } = data;
    try {
      // console.log("Uploading Banner with Data:", BannerData);
  
      const response = await axios.post(
        `${BaseUrl}subplans/uploadImage/${editId}`,
        BannerData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Ensure correct headers
        }
      );
  
      return response.data; // Make sure to return the `data` field
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };