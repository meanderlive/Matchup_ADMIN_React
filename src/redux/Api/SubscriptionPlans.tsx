import axios from "axios"

export const createSubscriptionPlans=async(data:any)=>{
    try {
        const resoponse = await axios.post("https://datingapi.meander.software/subscription/create",data)
        return resoponse
    } catch (error) {
      console.log(error)
      throw error;    
    }
}

export const getAllSubscriptionPlans=async(modeId:any)=>{
   
     try {
         const resoponse = await axios.get(`https://datingapi.meander.software/subscription/getall/${modeId}?page_no=1&page_size=100`)
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }

 export const deleteSubscriptionPlans=async(id:any)=>{
   
     try {
         const resoponse = await axios.delete(`https://datingapi.meander.software/subscription/remove/${id}`)
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
        `https://datingapi.meander.software/subscription/update/${editId}`,
        options
      );
      return response.data; // Fixed the variable name here
    } catch (error) {
      console.log(error);
      throw error;
    }
  };