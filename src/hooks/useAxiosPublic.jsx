import axios from "axios"

const axiosPublic = axios.create({
    baseURL:'https://y-pearl-nu.vercel.app'
})
const useAxiosPublic = () => {
  return axiosPublic;
}

export default useAxiosPublic
