import axios from "axios"
import BaseUrl from "../../BaseUrl"

const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4NTk4YTdlNjdjNzY2YTBhZjdkZTciLCJpYXQiOjE3MDEzMzc1MzV9.DvR_WLhCF_WmMhisJ4vrd_BJJHJtsTH-FqYJ9DysaVQ';

 const createLogin=async(data:any)=>{

  // const {values}=data
    try {
        const resoponse = await axios.post(`${BaseUrl}User/login`,data)
    
       
        return resoponse
    } catch (error) {
      console.log(error)      
      throw error;    
    }
}


 const createAdminLogin=async(data:any)=>{
    try {
        const resoponse = await axios.post(`${BaseUrl}User/admin-login`,data)
    
       
        return resoponse
    } catch (error) {
      console.log(error)      
      throw error;    
    }
}

export const Auth_Login_With_Mode=async(data:any)=>{
  const {modeID}= data
  try {
      const resoponse = await axios.post(`${BaseUrl}User/loginDefaultAdmin?modeId=${modeID}`,data)
    
     
      return resoponse
  } catch (error) {
    console.log(error)      
    throw error;    
  }
}

export const Get_all_Defualt_Admin=async(data:any)=>{
 
  try {
      const resoponse = await axios.post(`${BaseUrl}User/getalldefault?page_no=1&page_size=111`,data)
      
     
      return resoponse
  } catch (error) {
    console.log(error)      
    throw error;    
  }
}



export const forgotPassword = async(data:any)=>{
  try {
    const resoponse = await axios.post(`${BaseUrl}User/forgot-password`,data)
 
        return resoponse
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const verifyOTP = async(data:any)=>{

  // const options = {
  //   method:'POST',
  //   headers: {
  //     'x-access-token': token,
  //   },
  // };

  try {
    const resoponse = await axios.post(`${BaseUrl}User/verifyOTP`,data)
    
        return resoponse
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const resetPassword = async(data:any)=>{

  // const options = {
  //   method:'POST',
  //   headers: {
  //     'x-access-token': token,
  //   },
  // };

  try {
    const resoponse = await axios.post(`${BaseUrl}User/resetPassword`,data)
 
        return resoponse
  } catch (error) {
    console.log(error)
    throw error;
  }
}


export default createLogin