import axios from "axios"

const { REACT_APP_API_URL } = process.env;
const APIClient = axios.create({ baseURL: REACT_APP_API_URL });

async function getAllCustomers() {
    const { data } = await APIClient.get("/customers");
    return data;
  }
  
export {getAllCustomers}