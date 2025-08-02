import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAll_Preferences=async()=>{
 
     try {
         const resoponse = await axios.get(`${BaseUrl}preferences/getall?page_number=1&page_size=11`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }



 export const getbyID_Preferences=async(data:any)=>{
  const {id}=data
 
  try {
      const resoponse = await axios.get(`${BaseUrl}preferences/getById/${id}`)
      return resoponse?.data
  } catch (error) {
    console.log(error) 
    throw error;   
  }
}
 
// export const getByPreferences_Preferences=async(data:any)=>{
//   const {category_id,mode_id}=data
 
//   try {
//       const resoponse = await axios.get(`${BaseUrl}tags/getByCategory/${category_id}?modeId=${mode_id}&page_number=1&page_size=11`,data)
      
     
//       return resoponse
//   } catch (error) {
//     console.log(error)      
//     throw error;    
//   }
// }


export const create_Preferences=async(data:any)=>{
  const {values}=data
  try {
      const resoponse = await axios.post(`${BaseUrl}preferences/create`,values)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}

export const upload_Preferences_Image=async(data:any)=>{
  const {formData,id}=data

  try {
      const resoponse = await axios.post(`${BaseUrl}preferences/uploadImage/${id}`,formData)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}


export const delete_Preferences =async(id:any)=>{
 
 
   try {
       const resoponse = await axios.delete(`${BaseUrl}preferences/deletePreferences/${id}`)
       return resoponse
   } catch (error) {
     console.error(error) 
     throw error;   
   }
}




export const update_Preferences= async (data: any) => {
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
      `${BaseUrl}preferences/updatePreferences/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};
