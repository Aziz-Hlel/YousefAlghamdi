import { baseUrl } from "@src/utils/apiGateway";
import axios, { AxiosError, AxiosRequestConfig } from "axios";



export const axiosInstance = axios.create({
    baseURL: baseUrl + "/api",
    withCredentials: true
});

type HTTPRequestConfig = AxiosRequestConfig;


const Http = {

    get: async <T>(url: string, config: HTTPRequestConfig = {}) => {
        try {
            return await axiosInstance.get<T>(url, config);
        } catch (e) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response
        }
    },

    post: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {

        try {
            return await axiosInstance.post<T>(url, body, config);

        } catch (e) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response
        }

    },

    put: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
        try {
            return await axiosInstance.put<T>(url, body, config);

        } catch (e) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response
        }
    },

    patch: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
        try {
            return await axiosInstance.patch<T>(url, body, config);

        } catch (e) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response
        }

    },

    delete: <T>(url: string, config: HTTPRequestConfig = {}) => {
        return axiosInstance.delete<T>(url, config);
    },

}

export default Http;