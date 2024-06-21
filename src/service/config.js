import axios from "axios";

const http = axios.create({
  baseURL: "https://app.olimjanov.uz/v1",
});


http.interceptors.request.use((config) => {
  let token = ""
  if(token) {
    config.headers[Authorization] = token;
  }
  return config
});

export default http