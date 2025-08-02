import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAll_Inventories = async () => {

  try {
    const resoponse = await axios.get(`${BaseUrl}inventory/getall?page_number=1&page_size=999`)
    return resoponse
  } catch (error) {
    console.log(error)
    throw error;
  }
}



export const getbyID_Inventories = async (data: any) => {
  const { id } = data

  try {
    const resoponse = await axios.get(`${BaseUrl}inventory/getById/${id}`)
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


// export const create_Inventories = async (data: any) => {
//   const { Data } = data
//   try {
//     const resoponse = await axios.post(`${BaseUrl}inventory/create`, Data)
//     return resoponse
//   } catch (error) {
//     console.error(error)
//     throw error;
//   }
// }

export const create_Inventories = async (data: any) => {
  const { Data } = data;
  try {
    console.log("Sending data to API:", JSON.stringify(Data, null, 2)); // Log payload
    const response = await axios.post(`${BaseUrl}inventory/create`, Data);
    console.log("Response received:", response.data); // Log response
    return response;
  } catch (error: any) {
    console.error("Error in create_Inventories:", error.response?.data || error.message);
    throw error;
  }
};

export const upload_Inventories_Image = async (data: any) => {
  const { formData, id } = data

  try {
    const resoponse = await axios.post(`${BaseUrl}packageplans/uploadImage/${id}`, formData)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export const stock_Update = async (data: any) => {
  const { editId, values } = data;

  const options = {
    method: 'PATCH',
     // Use FormData instead of raw object
  };

  try {
    const resoponse = await axios.patch(`${BaseUrl}inventory/stockUpdate/${editId}`, values)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export const delete_Inventories = async (id: any) => {


  try {
    const resoponse = await axios.delete(`${BaseUrl}inventory/deleteInvent/${id}`)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}


export const update_Inventories = async (data: any) => {
  const { editId, values } = data;
  console.log("Updating Inventory - Data:", values);

  try {
    const response = await axios.put(`${BaseUrl}inventory/updateInvent/${editId}`, values, {
      headers: { 
        'Content-Type': 'application/json' // Sending JSON payload
      },
    });

    console.log("Inventory Update Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update Error:", error);
    throw error;
  }
};


// export const update_Inventories = async (data: any) => {
//   const { editId, values } = data;
//   console.log(data, "datacheck datadatadata");

//   const formData = new FormData();
//   Object.keys(values).forEach(key => {
//     formData.append(key, values[key]);
//   });

//   const options = {
//     method: 'PUT',
//     body: formData, // Use FormData instead of raw object
//   };

//   try {
//     const response = await fetch(`${BaseUrl}inventory/updateInvent/${editId}`, options);
    
//     console.log("API Raw Response:", await response.clone().text()); // Log raw response
    
//     if (!response.ok) {
//       throw new Error(`HTTP Error! Status: ${response.status}`);
//     }

//     const responseData = await response.json(); 
//     return responseData;
//   } catch (error) {
//     console.error("Update Error:", error);
//     throw error;
//   }
// };

