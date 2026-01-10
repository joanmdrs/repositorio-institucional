import { useState } from "react";
import { AuthContext } from "./auth.context";
import { login as loginService } from "./auth.service";
import { loadAuth, saveAuth, clearAuth } from "./auth.storage";
import type { LoginResponse } from "./auth.types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<LoginResponse | null>(loadAuth);

    async function login(username: string, password: string) {
        const data = await loginService({ username, password });
        setUser(data);
        saveAuth(data);
    }

    function logout() {
        setUser(null);
        clearAuth();
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
