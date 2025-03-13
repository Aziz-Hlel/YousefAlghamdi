import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:50/api",
    withCredentials: true
});

type HTTPRequestConfig = AxiosRequestConfig;


const Http = {

    get: async <T>(url: string, config: HTTPRequestConfig = {}) => {
        return await axiosInstance.get<T>(url, config);
    },

    post: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
        return await axiosInstance.post<T>(url, body, config);
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