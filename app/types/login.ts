export type ProfileResponse = { firstName: string, lastName: string, email: string };

export type LoginActionResponse = {jwtToken: string, refreshToken: string, profile: ProfileResponse};

export type RefreshTokenActionResponse = {isAuthenticated: boolean, jwtToken: string, refreshToken: string, profile: ProfileResponse | null, role: string};
 