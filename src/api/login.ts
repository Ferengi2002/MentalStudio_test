import { api } from "./http";
import type { LoginInput, LoginResponse } from "./index";

export async function login(data: LoginInput): Promise<LoginResponse> {
    const resp = await api.post("/auth/login", {
        username: data.username.trim(),
        password: data.password,
        expiresInMins: 60,
    });
    return resp.data;
}
