import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "https://url-shortner-sb-latest-8zf7.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;