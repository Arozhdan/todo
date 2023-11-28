import axios from "axios"

export const $api = axios.create({
  baseURL: __API__,
})

// interceptors
$api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log("error api", error)
    return Promise.reject(error)
  },
)
