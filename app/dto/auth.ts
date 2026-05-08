export type LoginPayload = {
    username: string;
    password: string;
    expiresInMins?: number;
};

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
};

export type AuthUserResponse = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
};

export type RefreshResponse = {
    accessToken: string;
    refreshToken?: string;
};
