import axios from "axios";
import type { LoginInput, LoginResponse } from ".";

export async function login(data: LoginInput): Promise<LoginResponse & { accessToken?: string }> {
    const resp = await axios.post(
        "https://dummyjson.com/auth/login",
        {
            username: data.username.trim(),
            password: data.password,
            expiresInMins: 60,
        },
        { headers: { "Content-Type": "application/json" } }
    );
    return resp.data;
}
