import axios from "axios"

export const createtermsAndConditions=async(data:any)=>{
    try {
        const resoponse = await axios.post("https://datingapi.meander.software/termsAndConditions/create",data)
        console.log(resoponse)
        if(resoponse.status){
          // dispatch(getalltermsAndConditionsSlice(iddd)as any)
        }
        return resoponse
    } catch (error) {
      console.log(error)
      throw error;    
    }
}


export const getAlltermsAndConditions=async(modeId:any)=>{
   
    try {
        const resoponse = await axios.get(`https://datingapi.meander.software/termsAndConditions/getall/${modeId}?page_no=1&page_size=100`)
        return resoponse
    } catch (error) {
      console.log(error) 
      throw error;   
    }
}


export const deletetermsAndConditions=async(id:any)=>{
   
    try {
        const resoponse = await axios.delete(`https://datingapi.meander.software/termsAndConditions/deleteTermsAndCondition/${id}`)
        return resoponse
    } catch (error) {
      console.log(error) 
      throw error;   
    }
}



export const updatetermsAndConditions = async (data: any) => {
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
        `https://datingapi.meander.software/termsAndConditions/updateTermsAndCondition/${editId}`,
        options
      );
      const dataaa = await response.json()
      console.log(dataaa)

      return  dataaa; // Fixed the variable name here
    } catch (error) {
      console.log(error);
      throw error;
    }
  };