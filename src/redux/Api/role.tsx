import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAllroles =async(data:string)=>{

  const {modeid}:any=data
 
 
     try {
         const resoponse = await axios.get(`${BaseUrl}roles/getall/${modeid}?page_number=1&page_size=100`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }




 export const create_role=async(data:any)=>{
  const {values}=data
  try {
      const resoponse = await axios.post(`${BaseUrl}roles/create`,values)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}


export const delete_Role =async(id:any)=>{
 
 
   try {
       const resoponse = await axios.delete(`${BaseUrl}roles/deleteRole/${id}`)
       return resoponse
   } catch (error) {
     console.error(error) 
     throw error;   
   }
}

 


export const update_Role= async (data: any) => {
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
      `${BaseUrl}roles/updateRole/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};


 export default getAllroles
