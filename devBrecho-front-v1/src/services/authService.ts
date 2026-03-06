import { api } from "../lib/api";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface ProfileReposne {
    userId: string;
}

export const login = async (
    credentials: LoginCredentials,
): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
};

export const profile = async () => {
    try {
        const response = await api.get("/auth/profile");

        if (!response || !response.data) {
            return null;
        }

        return response.data;
    } catch (error) {
        console.error("Erro na requisição de perfil:", error);
        throw error;
    }
};
