import axios from "axios"

export const createRating=async(data:any)=>{
    try {
        const resoponse = await axios.post("https://datingapi.meander.software/rating/create",data)
        console.log(resoponse)
       
        return resoponse
    } catch (error) {
      console.log(error)
      throw error;    
    }
}


export const getAllRating=async(modeId:any)=>{
   
    try {
        const resoponse = await axios.get(`https://datingapi.meander.software/rating/getall/${modeId}?page_no=1&page_size=999`)
        return resoponse
    } catch (error) {
      console.log(error) 
      throw error;   
    }
}


export const deleteRating=async(id:any)=>{
   
  try {
      const resoponse = await axios.delete(`https://datingapi.meander.software/faq/remove/${id}`)
      return resoponse
  } catch (error) {
    console.log(error) 
    throw error;   
  }
}