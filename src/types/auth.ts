export type AuthUser = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    image: string;
};

export type LoginResponse = AuthUser & {
    token?: string;
    accessToken?: string;
};
