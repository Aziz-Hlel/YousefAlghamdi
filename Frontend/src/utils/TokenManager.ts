

class TokenManager {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    // Set tokens in memory and localStorage
    setTokens(access: string, refresh: string): void {
        this.accessToken = access;
        this.refreshToken = refresh;
        localStorage.setItem('refreshToken', refresh);
    }

    // Get access token from memory
    getAccessToken(): string | null {
        return this.accessToken;
    }

    // Get refresh token from memory or localStorage
    getRefreshToken(): string | null {
        return this.refreshToken || localStorage.getItem('refreshToken');
    }

    // Load refresh token from localStorage on app start
    loadTokensFromStorage(): void {
        this.refreshToken = localStorage.getItem('refreshToken');
    }

    // Clear all tokens
    clearTokens(): void {
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem('refreshToken');
    }

    // Check if user is authenticated
    refreshTokenExist(): boolean {
        return !!this.getRefreshToken();
    }
}

export const tokenManager = new TokenManager();
