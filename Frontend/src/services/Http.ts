import axios, { AxiosError, AxiosRequestConfig } from "axios";

const nginx_ngrokUrl = "https://4d3e-197-15-72-205.ngrok-free.app/"
export const axiosInstance = axios.create({
    baseURL: nginx_ngrokUrl + "api",
    withCredentials: true
});

type HTTPRequestConfig = AxiosRequestConfig;


const Http = {

    get: async <T>(url: string, config: HTTPRequestConfig = {}) => {
        return await axiosInstance.get<T>(url, config);
    },

    post: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
        try {

            return await axiosInstance.post<T>(url, body, config);
        } catch (e) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response?.data
        }
    },

    put: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
        return axiosInstance.put<T>(url, body, config);
    },

    patch: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
        return axiosInstance.patch<T>(url, body, config);
    },

    delete: <T>(url: string, config: HTTPRequestConfig = {}) => {
        return axiosInstance.delete<T>(url, config);
    },

}

export default Http;