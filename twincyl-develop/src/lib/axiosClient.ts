import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type' : 'application/json',
    },
    withCredentials: true,
});

class Client {
    public async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosClient.get(path, config);
            return response.data;
        } catch (err) {
            this.handleError(err);
            throw err;
        }
    }

    public async post<T>(path: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosClient.post(path, data, config);
            return response.data;
        } catch (err) {
            this.handleError(err);
            throw err;
        }
    }

    private handleError(error: unknown) {
        console.error('サーバーとの通信でエラーが発生しました:', error);
    }
}

export const apiClient = new Client();
