import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.defaults.timeout = 5000
axiosInstance.defaults.validateStatus = () => true // do not throw errors on non-200 responses

export default axiosInstance
