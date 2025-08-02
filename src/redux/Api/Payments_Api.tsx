import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAll_Payment=async()=>{
 
     try {
         const resoponse = await axios.get(`${BaseUrl}payments/getall?page_number=1&page_size=999`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }



 export const getbyID_Payment=async(data:any)=>{
  const {id}=data
 
  try {
      const resoponse = await axios.get(`${BaseUrl}payments/getById/${id}`)
      return resoponse?.data
  } catch (error) {
    console.log(error) 
    throw error;   
  }
}
 
// export const getByPayment_Payment=async(data:any)=>{
//   const {category_id,mode_id}=data
 
//   try {
//       const resoponse = await axios.get(`${BaseUrl}tags/getByCategory/${category_id}?modeId=${mode_id}&page_number=1&page_size=11`,data)
      
     
//       return resoponse
//   } catch (error) {
//     console.log(error)      
//     throw error;    
//   }
// }


export const create_Payment=async(data:any)=>{
  const {values}=data
  try {
      const resoponse = await axios.post(`${BaseUrl}payments/create`,values)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}

export const upload_Payment_Image=async(data:any)=>{
  const {formData,id}=data

  try {
      const resoponse = await axios.post(`${BaseUrl}payments/uploadImage/${id}`,formData)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}


export const delete_Payment =async(id:any)=>{
 
 
   try {
       const resoponse = await axios.delete(`${BaseUrl}payments/deletePayments/${id}`)
       return resoponse
   } catch (error) {
     console.error(error) 
     throw error;   
   }
}




export const update_Payment= async (data: any) => {
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
      `${BaseUrl}payments/updatePayments/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};
