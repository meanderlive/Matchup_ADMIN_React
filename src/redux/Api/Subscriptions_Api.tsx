import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAll_Subscriptions=async()=>{
 
     try {
         const resoponse = await axios.get(`${BaseUrl}subscriptions/getall?page_number=1&page_size=111`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }



 export const getbyID_Subscriptions=async(data:any)=>{
  const {id}=data
 
  try {
      const resoponse = await axios.get(`${BaseUrl}subscriptions/getById/${id}`)
      return resoponse?.data
  } catch (error) {
    console.log(error) 
    throw error;   
  }
}
 
// export const getBySubscriptions_Subscriptions=async(data:any)=>{
//   const {category_id,mode_id}=data
 
//   try {
//       const resoponse = await axios.get(`${BaseUrl}tags/getByCategory/${category_id}?modeId=${mode_id}&page_number=1&page_size=11`,data)
      
     
//       return resoponse
//   } catch (error) {
//     console.log(error)      
//     throw error;    
//   }
// }


export const create_Subscriptions=async(data:any)=>{
  const {values}=data
  try {
      const resoponse = await axios.post(`${BaseUrl}subscriptions/create`,values)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}

export const upload_Subscriptions_Image=async(data:any)=>{
  const {formData,id}=data

  try {
      const resoponse = await axios.post(`${BaseUrl}subscriptions/uploadImage/${id}`,formData)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}


export const delete_Subscriptions =async(id:any)=>{
 
 
   try {
       const resoponse = await axios.delete(`${BaseUrl}subscriptions/deleteSubscriptions/${id}`)
       return resoponse
   } catch (error) {
     console.error(error) 
     throw error;   
   }
}




export const update_Subscriptions= async (data: any) => {
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
      `${BaseUrl}subscriptions/updateSubscriptions/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};
