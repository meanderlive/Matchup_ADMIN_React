import axios from "axios"

export const createPrivecyPolicys=async(data:any)=>{
    try {
        const resoponse = await axios.post("https://datingapi.meander.software/privacy_policys/create",data)
        console.log(resoponse)
        if(resoponse.status){
          // dispatch(getallPrivecyPolicysSlice(iddd)as any)
        }
        return resoponse
    } catch (error) {
      console.log(error)
      throw error;    
    }
}


export const getAllPrivecyPolicys=async(modeId:any)=>{
   
    try {
        const resoponse = await axios.get(`https://datingapi.meander.software/privacy_policys/getall/${modeId}?page_no=1&page_size=100`)
        return resoponse
    } catch (error) {
      console.log(error) 
      throw error;   
    }
}


export const deletePrivecyPolicys=async(id:any)=>{
   
    try {
        const resoponse = await axios.delete(`https://datingapi.meander.software/privacy_policys/deleteTermsAndCondition/${id}`)
        return resoponse
    } catch (error) {
      console.log(error) 
      throw error;   
    }
}



export const updatePrivecyPolicys = async (data: any) => {
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
        `https://datingapi.meander.software/privacy_policys/updatePrivacy_policy/${editId}`,
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