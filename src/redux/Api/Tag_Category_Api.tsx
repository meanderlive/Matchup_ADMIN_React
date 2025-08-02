import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAll_Tag_category=async()=>{
 
     try {
         const resoponse = await axios.get(`${BaseUrl}tag_categories/getall?page_number=1&page_size=999`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }



 export const getbyID_Tag_Category=async(data:any)=>{
  const {id}=data
  console.log("check the data",data[0]?._id)

  try {
      const resoponse = await axios.get(`${BaseUrl}tag_categories/getById/${id}`,data)
      return resoponse?.data
  } catch (error) {
    console.log(error) 
    throw error;   
  }
}
 
// export const all_mode_with_Admin=async(data:any)=>{
 
//   try {
//       const resoponse = await axios.get(`${BaseUrl}User/getalldefault?page_no=1&page_size=111`,data)
      
     
//       return resoponse
//   } catch (error) {
//     console.log(error)      
//     throw error;    
//   }
// }


export const create_tag_Category=async(data:any)=>{
  const {values}=data
  try {
      const resoponse = await axios.post(`${BaseUrl}tag_categories/create`,values)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}


export const delete_tag_Category =async(id:any)=>{
 
 
   try {
       const resoponse = await axios.delete(`${BaseUrl}tag_categories/deleteTag_categories/${id}`)
       return resoponse
   } catch (error) {
     console.error(error) 
     throw error;   
   }
}




export const update_tag_Category= async (data: any) => {
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
      `${BaseUrl}tag_categories/updateTag_categories/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};
