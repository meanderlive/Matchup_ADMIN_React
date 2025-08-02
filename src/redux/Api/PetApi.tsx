import axios from "axios"


const BaseURl = 'https://datingapi.meander.software/';
const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4NTk4YTdlNjdjNzY2YTBhZjdkZTciLCJpYXQiOjE3MDEzMzc1MzV9.DvR_WLhCF_WmMhisJ4vrd_BJJHJtsTH-FqYJ9DysaVQ';
 
export const createPeta=async(data:any)=>{
    try {
        const resoponse = await axios.post(`${BaseURl}Pet/create`,data)
        return resoponse
    } catch (error) {
      console.error(error)
      throw error;    
    }
}


export const getAllPet=async(data:any)=>{
  const {currentPage,modeid}=data
   const option={
    headers: {
       
        'x-access-token': token
      }
   }
    try {
        const resoponse = await axios.get(`${BaseURl}Pet/getall/${modeid}?page_no=$1&page_size=100`,option)
        return resoponse
    } catch (error) {
      console.error(error) 
      throw error;   
    }
}
export const getbyidPet=async(data:any)=>{
  
   const option={
    headers: {
       
        'x-access-token': token
      }
   }
    try {
        const resoponse = await axios.get(`${BaseURl}Pet/getById/${data}`,option)
        return resoponse
    } catch (error) {
      console.error(error) 
      throw error;   
    }
}
export const petGetbyUserId=async(data:any)=>{
  
  const option={
   headers: {
      
       'x-access-token': token
     }
  }
   try {
       const resoponse = await axios.get(`${BaseURl}pet/getByUserId/${data}?page_no=1&page_size=11`,option)
       return resoponse
   } catch (error) {
     console.error(error) 
     throw error;   
   }
}
export const deletePet=async(id:any)=>{
    const option={
     headers: {
        
         'x-access-token': token
       }
    }
     try {
         const resoponse = await axios.delete(`${BaseURl}Pet/remove/${id}`,option)
         return resoponse
     } catch (error) {
       console.error(error) 
       throw error;   
     }
 }
 export const updatestatus = async (data: any) => {
  const { editId, status } = data;
  const options = {
    method:'PUT',
    headers: {
      'content-type':'application/json',
      'x-access-token':
        token,
    },
    body: JSON.stringify({status}),
  };
  try {
    const response:any = await fetch(
      `${BaseURl}Pet/update/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};
 export const updatePet = async (data: any) => {
    const { editId, values } = data;
    const options = {
      method:'PUT',
      headers: {
        'content-type':'application/json',
        'x-access-token':
          token,
      },
      body: JSON.stringify(values),
    };
    try {
      const response:any = await fetch(
        `${BaseURl}Pet/update/${editId}`,
        options
      );
      return response.data; // Fixed the variable name here
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const searchPet = async (name: any) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(
      `${BaseURl}Pet/filter?name=${name}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const responseData = await response.json();
    
    return responseData; // Assuming the response is already JSON, no need to stringify.
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchPetbyAge = async (data:any) => {

  const {gender, minAge, maxAge}=data
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(
      `${BaseURl}Pet/filter?gender=${gender}&minAge=${minAge}&maxAge=${maxAge}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const responseData = await response.json();
    
    return responseData; // Assuming the response is already JSON, no need to stringify.
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const sortPet =async(sort:any)=>{
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await fetch(
      `${BaseURl}Pet/sort?sort_by_name=${sort}`,
      options
    );
    const responseData = await response.json();
    
    return responseData; 
  } catch (error) {
    console.error(error);
    throw error;
  }
}




export const createProfile = async (data:any) => {
  const { avatarFil } = data;

  const formData = new FormData();
  formData.append('image', avatarFil); // Assuming 'avatar' is the key for the file in the FormData
  const options = {
    method:'PUT',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'x-access-token': token,

    },
   

    body:formData
  };

  try {
    const response = await fetch(`${BaseURl}Pet/uploadMainProfile/${data.imageid}`, options);   
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const uploadGalleryImage = async (data:any) => {
  const { avatarFil } = data;

  const formData = new FormData();
  formData.append('image', avatarFil); // Assuming 'avatar' is the key for the file in the FormData
  const options = {
    method:'PUT',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'x-access-token': token,

    },
   

    body:formData
  };

  try {
    const response = await fetch(`${BaseURl}Pet/uploadProfile/${data.id}`, options);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const RemoveImageintoGallery = async (data:any) => {
  const  {id,item} = data 
  console.log(id, item);
  
  const options = {
    method:'DELETE',
    headers: {
  
      'x-access-token': token,

    },
   

  
  };
  

  try {
    const response = await fetch(`${BaseURl}Pet/${id}/remove-avatar/${item}`, options);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
