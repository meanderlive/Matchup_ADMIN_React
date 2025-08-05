import axios from "axios"

 const getAllmodes=async()=>{
 
     try {
         const resoponse = await axios.get("https://datingapi.meander.software/modes/getall?page_number=1&page_size=100")
         return resoponse
     } catch (error) {
       console.log(error) 
       throw error;   
     }
 }
 export default getAllmodes
