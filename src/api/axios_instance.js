import axios from "axios"

const axios_instance = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true,
    headers: {
        accept: "application/json"
    }
})

export default axios_instance