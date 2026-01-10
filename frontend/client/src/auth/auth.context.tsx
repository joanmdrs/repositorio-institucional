import { createContext } from "react";
import type { LoginResponse } from "./auth.types";

export interface AuthContextData {
    user: LoginResponse | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

