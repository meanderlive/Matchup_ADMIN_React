import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAll_Tag_SubCategory=async()=>{
 
     try {
         const resoponse = await axios.get(`${BaseUrl}tags/getall?page_number=1&page_size=999`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }



 export const getbyID_Tag_SubCategory=async(data:any)=>{
  const {id}=data
 
  try {
      const resoponse = await axios.get(`${BaseUrl}tags/getById/${id}`)
      return resoponse?.data
  } catch (error) {
    console.log(error) 
    throw error;   
  }
}
 
export const getByCategory_Tag_SubCategory=async(data:any)=>{
  const {category_id,mode_id}=data
 
  try {
      const resoponse = await axios.get(`${BaseUrl}tags/getByCategory/${category_id}?modeId=${mode_id}&page_number=1&page_size=11`,data)
      
     
      return resoponse
  } catch (error) {
    console.log(error)      
    throw error;    
  }
}


export const create_tag_SubCategory=async(data:any)=>{
  const {values}=data
  try {
      const resoponse = await axios.post(`${BaseUrl}tags/create`,values)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}

export const upload_tag_Image=async(data:any)=>{
  const {formData,id}=data

  try {
      const resoponse = await axios.post(`${BaseUrl}tags/uploadImage/${id}`,formData)
      return resoponse
  } catch (error) {
    console.error(error)
    throw error;    
  }
}


export const delete_tag_SubCategory =async(id:any)=>{
 
 
   try {
       const resoponse = await axios.delete(`${BaseUrl}tags/deleteTags/${id}`)
       return resoponse
   } catch (error) {
     console.error(error) 
     throw error;   
   }
}




export const update_tag_SubCategory= async (data: any) => {
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
      `${BaseUrl}tags/updateTags/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};
