import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:50/",
    withCredentials: true
});

type HTTPRequestConfig = AxiosRequestConfig;


const Http = {

    get: <T>(url: string, config: HTTPRequestConfig = {}) => {
        return axiosInstance.get<T>(url, config);
    },

    post: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
        return axiosInstance.post<T>(url, body, config);
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