import api from "../api/api";
import type { TrabalhoInterface } from "../interfaces/TrabalhoInterface";

export async function criarTrabalho(data: TrabalhoInterface) {
    const response = await api.post("trabalho/criar/", data);
    return response.data;
}

export async function listarTrabalhos() { 
    const response = await api.get("trabalho/listar/");
    return response.data;
}

export async function atualizarTrabalho(id: number, data: TrabalhoInterface) {
    const response = await api.put(`trabalho/atualizar/${id}/`, data);
    return response.data;
}

export async function deletarTrabalho(id: number) {
    const response = await api.delete(`trabalho/deletar/${id}/`);
    return response.data;
}

export async function filtrarTrabalhosPorTitulo(titulo: string) {
    const response = await api.get(`trabalho/filtrar-pelo-titulo/?titulo=${titulo}`);
    return response.data;
}

export async function filtrarTrabalhosPorAnoDefesa(ano_defesa: number) {
    const response = await api.get(`trabalho/filtrar-pelo-ano/?ano=${ano_defesa}`);
    return response.data;
}

export async function filtrarTrabalhosPeloNomeDoAutor(autor_nome: string) {
    const response = await api.get(`trabalho/filtrar-pelo-nome-autor/?autor_nome=${autor_nome}`);
    return response.data;
}