export interface UsuarioInterface {
    id?: number;
    username: string;
    password: string;
    email: string;
    groups: number[];
}