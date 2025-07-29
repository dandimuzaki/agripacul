import axios from 'axios';


export const uploadImage = async (data) => {
  const res = await axios.post('https://agripacul-production.up.railway.app/api/upload', data)
  return res.data;
}