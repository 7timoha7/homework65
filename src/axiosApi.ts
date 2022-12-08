import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://artemmarkelov-690a3-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default axiosApi;