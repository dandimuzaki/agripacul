import axios from "axios";

export const createAccount = async (data) => {
  const res = await axios.post(
    'https://agripacul-production.up.railway.app/api/register',
    data,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    return res.data
}

export const searchEmail = async (email) => {
  try {
    const res = await axios.get(`https://agripacul-production.up.railway.app/api/register/${email}`);
    return res.status;
  } catch (err) {
    return err.response?.status || 500;
  }
}

export const login = async (data) => {
  try {
    const res = await axios.post('https://agripacul-production.up.railway.app/api/login', data)
    return res.data
  } catch (err) {
    return err
  }
}