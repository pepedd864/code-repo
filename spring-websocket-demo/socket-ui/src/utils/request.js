import axios from "axios";

const request = axios.create({
  baseURL: '/api/',
  timeout: 5000,
})

export default request
