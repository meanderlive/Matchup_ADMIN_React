import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAll_plans = async () => {

  try {
    const resoponse = await axios.get(`${BaseUrl}packageplans/getall?page_number=1&page_size=999`)
    return resoponse
  } catch (error) {
    console.log(error)
    throw error;
  }
}



export const getbyID_plans = async (data: any) => {
  const { id } = data

  try {
    const resoponse = await axios.get(`${BaseUrl}packageplans/getById/${id}`)
    return resoponse?.data
  } catch (error) {
    console.log(error)
    throw error;
  }
}

// export const getBypackageplans_packageplans=async(data:any)=>{
//   const {category_id,mode_id}=data

//   try {
//       const resoponse = await axios.get(`${BaseUrl}tags/getByCategory/${category_id}?modeId=${mode_id}&page_number=1&page_size=11`,data)


//       return resoponse
//   } catch (error) {
//     console.log(error)      
//     throw error;    
//   }
// }


export const create_plans = async (data: any) => {
  const { formData } = data
  try {
    const resoponse = await axios.post(`${BaseUrl}packageplans/create`, formData)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export const upload_plans_Image = async (data: any) => {
  const { formData, id } = data

  try {
    const resoponse = await axios.post(`${BaseUrl}packageplans/uploadImage/${id}`, formData)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}


export const delete_plans = async (id: any) => {


  try {
    const resoponse = await axios.delete(`${BaseUrl}packageplans/deleteplans/${id}`)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}




export const update_plans = async (data: any) => {
  const { editId, values } = data;
  console.log(data, "datacheck datadatadata");

  const formData = new FormData();
  Object.keys(values).forEach(key => {
    formData.append(key, values[key]);
  });

  const options = {
    method: 'PUT',
    body: formData, // Use FormData instead of raw object
  };

  try {
    const response = await fetch(`${BaseUrl}packageplans/updateplans/${editId}`, options);
    
    console.log("API Raw Response:", await response.clone().text()); // Log raw response
    
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const responseData = await response.json(); 
    return responseData;
  } catch (error) {
    console.error("Update Error:", error);
    throw error;
  }
};

