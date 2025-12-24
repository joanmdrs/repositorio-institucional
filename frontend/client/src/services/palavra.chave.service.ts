import api from "../api/api";
import type { PalavraChaveInterface } from "../interfaces/PalavraChaveInterface";

export async function criarPalavraChave(data: PalavraChaveInterface) {
    const response = await api.post("palavra_chave/criar/", data);
    return response.data;
}

export async function listarPalavrasChave() { 
    const response = await api.get("palavra_chave/listar/");
    return response.data;
}

export async function atualizarPalavraChave(id: number, data: PalavraChaveInterface) {
    const response = await api.put(`palavra_chave/atualizar/${id}/`, data);
    return response.data;
}

export async function deletarPalavraChave(id: number) {
    const response = await api.delete(`palavra_chave/deletar/${id}/`);
    return response.data;
}

export async function filtrarPalavrasChavePorNome(termo: string) {
    const response = await api.get(`palavra_chave/buscar-pelo-termo/?termo=${termo}`);
    return response.data;
}   