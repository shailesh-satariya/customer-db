export interface Login_login {
    __typename: "User";
    token: string | null;
}

export interface Login {
    login: Login_login;
}

export interface LoginVariables {
    username: string;
    password: string;
}