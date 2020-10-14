export interface Register_register {
    __typename: "User";
    token: string | null;
}

export interface Register {
    register: Register_register;
}

export interface RegisterVariables {
    username: string;
    password: string;
    name: string;
}