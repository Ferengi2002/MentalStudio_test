export interface LoginInput { username: string; password: string; }
export interface AuthUser { id: number; username: string; firstName: string; lastName: string; image?: string; }
export interface LoginResponse extends AuthUser { token: string; }
