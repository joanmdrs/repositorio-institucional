import api from "../api/api";
import type { AutorInterface } from "../interfaces/AutorInterface";


export async function criarAutor(data: AutorInterface) {
    const response = await api.post("autor/criar/", data);
    return response.data;
}

export async function listarAutores() { 
    const response = await api.get("autor/listar/");
    return response.data;
}

export async function AtualizarAutor(id: number, data: AutorInterface) {
    const response = await api.put(`autor/atualizar/${id}/`, data);
    return response.data;
}

export async function deletarAutor(id: number) {
    const response = await api.delete(`autor/deletar/${id}/`);
    return response.data;
}