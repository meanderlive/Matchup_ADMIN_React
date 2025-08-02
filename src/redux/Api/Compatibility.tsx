import axios from "axios";
import  BaseUrl  from "../../BaseUrl";


export const createCompatibilityApi =async(data:any)=>{
    const {modify}= data
    try {
        const response = await axios.post(`${BaseUrl}/compatibility/create`,modify)
        return response
    } catch (error) {
        console.log(error)
      throw error;   

    }
}

export const getAllCompatibilityApi = async(modeid :any)=>{
    try {
        const response = await axios.get(`${BaseUrl}/compatibility/getall/${modeid}?page_no=1&page_size=100`)
        return response
    } catch (error) {
        console.log(error)  
      throw error;   
        
    }
}

export const deleteCompatibilityApi=async(id:any)=>{
   
    try {
        const resoponse = await axios.delete(`${BaseUrl}/compatibility/remove/${id}`)
        return resoponse
    } catch (error) {
      console.log(error) 
      throw error;   
    }
}
export const updateCompatibility = async (data: any) => {
    const { editId, modify } = data;
    const options = {
      method:'PUT',
      headers: {
        'content-type':'application/json',
        
      },
      body: JSON.stringify(modify),
    };
    try {
      const response:any = await fetch(
        `https://datingapi.meander.software/compatibility/update/${editId}`,
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


 
  export const searchCompatibility = async (name: any) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch(
        `https://datingapi.meander.software/Compatibility/search/6565dbb8f55b057bd1fc4a82?name=${name}`,
        options
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
      
      return responseData; // Assuming the response is already JSON, no need to stringify.
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
    
  export const sortCompatibility =async(sort:any)=>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  
    try {
      const response = await fetch(
        `https://datingapi.meander.software/Compatibility/sort/6565dbb8f55b057bd1fc4a82?sort=${sort}`,
        options
      );
      const responseData = await response.json();
      console.log(responseData);
      
      return responseData; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  }