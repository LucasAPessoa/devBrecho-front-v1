import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "../services/authService";
import type { AxiosError } from "axios";

interface ErrorResponse {
    statusCode: number;
    message: string;
    details: string;
}

export const useAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigateTo = useNavigate();

    const { mutate: loginMutation, isPending: isLoggingIn } = useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            toast.success(data.message);

            navigateTo("/bolsas");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const message = error.message || "Erro ao tentar logar.";

            toast.error(message);
        },
    });

    const handleLogin = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning("Por favor, informe todos os campos");
            return;
        }

        loginMutation({ email, password });
    };

    // const registerMutation = null; //PLACEHOLDER FOR FUTURE IMPLEMENTATION

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        toggleShowPassword: () => setShowPassword(!showPassword),

        isLoading: isLoggingIn,
        handleLogin,
    };
};
