import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { tokenManager } from "./TokenManager";
import { baseUrl } from "./apiGateway";

interface ApiResponse<T = any> {
    data?: T;
    error?: string;
}

class ApiService {
    private api: AxiosInstance;
    private isRefreshing = false;
    private failedQueue: Array<{
        resolve: (token: string) => void;
        reject: (error: any) => void;
    }> = [];

    constructor() {
        this.api = axios.create({
            baseURL: baseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor - add auth header
        this.api.interceptors.request.use(
            (config) => {
                const token = tokenManager.getAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor - handle token refresh
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({
                                resolve: (token: string) => {
                                    originalRequest.headers.Authorization = `Bearer ${token}`;
                                    resolve(this.api(originalRequest));
                                },
                                reject,
                            });
                        });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const newAccessToken = await this.refreshAccessToken();
                        this.processQueue(null, newAccessToken);
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return this.api(originalRequest);
                    } catch (refreshError) {
                        this.processQueue(refreshError);
                        tokenManager.clearTokens();
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    // Process failed request queue
    private processQueue(error: any, token: string | null = null): void {
        this.failedQueue.forEach(({ resolve, reject }) => {
            if (error) {
                reject(error);
            } else {
                resolve(token!);
            }
        });

        this.failedQueue = [];
    }

    // Refresh access token
    private async refreshAccessToken(): Promise<string> {
        const refreshToken = tokenManager.getRefreshToken();

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(`${this.api.defaults.baseURL}/user/refresh`, {
            refreshToken,
        });

        tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
        return response.data.accessToken;
    }

    // Wrapper methods with error handling
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.get<T>(url, config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response?.data?.error || error.message || 'Request failed' };
        }
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.post<T>(url, data, config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response?.data?.error || error.message || 'Request failed' };
        }
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.put<T>(url, data, config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response?.data?.error || error.message || 'Request failed' };
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.api.delete<T>(url, config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response?.data?.error || error.message || 'Request failed' };
        }
    }







    // Wrapper methods with error handling
    async get2<T>(url: string, config?: AxiosRequestConfig) {
        try {
            return await this.api.get<T>(url, config);
        } catch (e: any) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response

        }
    }

    async post2<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            return await this.api.post<T>(url, data, config);
        } catch (e: any) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response

        }
    }

    async put2<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            return await this.api.put<T>(url, data, config);
        } catch (e: any) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response

        }
    }

    async delete2<T>(url: string, config?: AxiosRequestConfig) {
        try {
            return await this.api.delete<T>(url, config);
        } catch (e: any) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response

        }
    }

    async patch2<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            return await this.api.patch<T>(url, data, config);

        } catch (e: any) {
            axios.isAxiosError(e) && console.log(e.response?.data);
            if (axios.isAxiosError(e)) return e.response

        }
    }
}

export const apiService = new ApiService();

