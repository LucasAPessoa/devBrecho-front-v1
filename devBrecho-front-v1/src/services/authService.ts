import { api } from "../lib/api";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export const login = async (
    credentials: LoginCredentials,
): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
};
