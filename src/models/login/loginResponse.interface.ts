export interface LoginResponse {
	token: string;
	user: {
		name: string;
		email: string;
		userId: number;
		auth_level: string;
	}
}