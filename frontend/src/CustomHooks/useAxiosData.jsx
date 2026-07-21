import axios from 'axios';

const axiosData = axios.create({
  baseURL: "https://fixit-backend-fzox.onrender.com",

});


export const useAxiosData = () => {
  return axiosData;
  
}

