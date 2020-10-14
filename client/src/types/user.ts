export interface UserCredential {
    username: string;
    password: string;
}

export interface User extends UserCredential {
    __typename: "User";
    _id?: string;
    username: string;
    password: string;
    name: string;
}
