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

        console.log("Resposta da API de perfil:", response);
        // Axios siempre envuelve la respuesta en un objeto con la propiedad 'data'
        if (!response || !response.data) {
            return null;
        }

        return response.data;
    } catch (error) {
        // Si hay un error de red o 4xx/5xx, Axios salta al catch
        console.error("Erro na requisição de perfil:", error);
        throw error; // Es vital relanzar el error para que useMutation lo capture en 'onError'
    }
};
