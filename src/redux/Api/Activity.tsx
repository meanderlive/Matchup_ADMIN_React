import axios from "axios";
import  BaseUrl  from "../../BaseUrl";


export const createActivityApi =async(data:any)=>{
    try {
        const response = await axios.post(`${BaseUrl}/Activity/create`,data)
        return response
    } catch (error) {
        console.log(error)
      throw error;   

    }
}

export const getBySenderUserId = async(data :any)=>{
    const {modeid,id} =data 
    try {
        const response = await axios.get(`${BaseUrl}/activitys/getBySenderUserId/${id}?modeId=${modeid}&page_no=1&page_size=100`)
        return response
    } catch (error) {
        console.log(error)  
      throw error;   
        
    }
}

export const deleteActivityApi=async(id:any)=>{
   
    try {
        const resoponse = await axios.delete(`${BaseUrl}/Activity/remove/${id}`)
        return resoponse
    } catch (error) {
      console.log(error) 
      throw error;   
    }
}
export const updateActivity = async (data: any) => {
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
        `https://datingapi.meander.software/Activity/update/${editId}`,
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


  export const searchUser = async (name: any) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch(
        `https://datingapi.meander.software/users/search?name=${name}`,
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
  export const searchActivity = async (name: any) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch(
        `https://datingapi.meander.software/Activity/search/6565dbb8f55b057bd1fc4a82?name=${name}`,
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
    
  export const sortActivity =async(sort:any)=>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  
    try {
      const response = await fetch(
        `https://datingapi.meander.software/Activity/sort/6565dbb8f55b057bd1fc4a82?sort=${sort}`,
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