import axios from 'axios';


export const uploadImage = async (formData) => {
  const res = await axios.post('https://agripacul-production.up.railway.app/api/upload', formData)
  return res.data;
}