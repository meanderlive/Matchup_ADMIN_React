import axios from "axios"
import BaseUrl from "../../BaseUrl"

export const getAll_Services = async () => {

  try {
    const resoponse = await axios.get(`${BaseUrl}services/getall?page_number=1&page_size=999`)
    return resoponse
  } catch (error) {
    console.log(error) 
    throw error;
  }
}



export const getbyID_Services = async (data: any) => {
  const { id } = data

  try {
    const resoponse = await axios.get(`${BaseUrl}services/getById/${id}`)
    return resoponse?.data
  } catch (error) {
    console.log(error)
    throw error;
  }
}

// export const getByServices_Services=async(data:any)=>{
//   const {category_id,mode_id}=data

//   try {
//       const resoponse = await axios.get(`${BaseUrl}tags/getByCategory/${category_id}?modeId=${mode_id}&page_number=1&page_size=11`,data)


//       return resoponse
//   } catch (error) {
//     console.log(error)      
//     throw error;    
//   }
// }




export const create_Services = async (data: any) => {
  const { values } = data
  try {
    const resoponse = await axios.post(`${BaseUrl}services/create`, values)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}

// export const uploadBanners=async(data:any)=>{
//   const {BannerData}=data
//   try {
//       const resoponse = await axios.post(`${BaseUrl}services/uploadBanner/${data.editId}`,BannerData)
//       return resoponse
//   } catch (error) {
//     console.error(error)
//     throw error;    
//   }
// }


export const uploadBanners = async (data: any) => {
  const { BannerData, editId } = data;
  try {
    // console.log("Uploading Banner with Data:", BannerData);

    const response = await axios.post(
      `${BaseUrl}services/uploadBanner/${editId}`,
      BannerData,
      {
        headers: { "Content-Type": "multipart/form-data" }, // Ensure correct headers
      }
    );

    return response.data; // Make sure to return the `data` field
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};


export const upload_Services_Image = async (data: any) => {
  const { formData, id } = data

  try {
    const resoponse = await axios.post(`${BaseUrl}services/uploadImage/${id}`, formData)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}


export const delete_Services = async (id: any) => {


  try {
    const resoponse = await axios.delete(`${BaseUrl}services/deleteServices/${id}`)
    return resoponse
  } catch (error) {
    console.error(error)
    throw error;
  }
}




export const update_Services = async (data: any) => {
  const { editId, values } = data;
  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',

    },
    body: JSON.stringify(values),
  };
  try {
    console.log('body', options.body)

    const response: any = await fetch(
      `${BaseUrl}services/updateServices/${editId}`,
      options
    );
    return response.data; // Fixed the variable name here
  } catch (error) {
    console.error(error);
    throw error;
  }
};
