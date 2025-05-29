import { baseUrl } from "@src/utils/apiGateway";
import { apiService } from "@src/utils/apiService";
import axios, { AxiosError, AxiosRequestConfig } from "axios";



export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,

    // headers: { 'Content-Type': 'application/json' },

});

type HTTPRequestConfig = AxiosRequestConfig;




const Http = {

    get: async <T>(url: string, config: HTTPRequestConfig = {}) => {
        try {
            return await apiService.get2<T>(url, config);
        } catch (e) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response
        }
    },

    post: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {


        return await apiService.post2<T>(url, body, config);



    },

    put: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {

        return await apiService.put2<T>(url, body, config);


    },

    patch: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {

        return await apiService.patch2<T>(url, body, config);



    },

    delete: async <T>(url: string, config: HTTPRequestConfig = {}) => {

        return await apiService.delete2<T>(url, config);


    },

}

export default Http;