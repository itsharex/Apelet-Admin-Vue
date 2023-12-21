export type LoginForm = {
	username: string;
	password: string;
	verifyCode?: string;
};

export type LoginResponseType = {
	token: string;
};

export type UserInfoOption = {
	username: string;
	roles: string[];
	permissions: string[];
};
