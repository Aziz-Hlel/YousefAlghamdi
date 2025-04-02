import { baseUrl } from "@src/utils/apiGateway";
import axios, { AxiosError, AxiosRequestConfig } from "axios";



export const axiosInstance = axios.create({
    baseURL: baseUrl + "/api",
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
            if (axios.isAxiosError(e)) return e.response
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