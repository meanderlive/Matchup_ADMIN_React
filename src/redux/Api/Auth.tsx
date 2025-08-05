import axios from "axios"

 const createLogin=async(data:any)=>{
    try {
        const resoponse = await axios.post("https://datingapi.meander.software/admin/login",data)
        console.log(resoponse)
       
        return resoponse
    } catch (error) {
      console.log(error)
      throw error;    
    }
}


export const forgotPassword = async(data:any)=>{
  try {
    const resoponse = await axios.post("https://datingapi.meander.software/admin/forgot-password",data)
        console.log(resoponse)
        return resoponse
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const verifyOTP = async(data:any)=>{
  try {
    const resoponse = await axios.post("https://datingapi.meander.software/admin/verifyOTP",data)
        console.log(resoponse)
        return resoponse
  } catch (error) {
    console.log(error)
    throw error;
  }
}
export default createLogin