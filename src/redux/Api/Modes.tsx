import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAllmodes=async()=>{
 
     try {
         const resoponse = await axios.get(`${BaseUrl}modes/getall?page_number=1&page_size=11000`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }
 


 export const getbtIDmodes=async(data:any)=>{
  const {id}=data
 
  try {
      const resoponse = await axios.get(`${BaseUrl}modes/getById/${id}`)
      return resoponse?.data
  } catch (error) {
    console.log(error) 
    throw error;   
  }
}
 
export const all_mode_with_Admin=async(data:any)=>{
 
  try {
      const resoponse = await axios.get(`${BaseUrl}User/getalldefault?page_no=1&page_size=111`,data)
      
     
      return resoponse
  } catch (error) {
    console.log(error)      
    throw error;    
  }
}


export const create_mode=async(data:any)=>{
  const {values}=data
  try {
      const resoponse = await axios.post(`${BaseUrl}modes/create`,values)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}


export const delete_mode =async(id:any)=>{
 
 
   try {
       const resoponse = await axios.delete(`${BaseUrl}modes/deletemode/${id}`)
       return resoponse
   } catch (error) {
     console.error(error) 
     throw error;   
   }
}




export const update_mode= async (data: any) => {
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
      `${BaseUrl}modes/updatemode/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};
