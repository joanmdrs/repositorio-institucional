import api from "../api/api";
import type { TrabalhoInterface } from "../interfaces/TrabalhoInterface";

export async function criarTrabalho(formData: FormData) {
    const response = await api.post("trabalho/criar/", formData);
    return response;
}

export async function listarTrabalhos() { 
    const response = await api.get("trabalho/listar/");
    return response;
}

export async function atualizarTrabalho(id: number, formData: FormData) {
    const response = await api.put(`trabalho/atualizar/${id}/`, formData);
    return response;
}

export async function excluirTrabalho(id: number) {
    const response = await api.delete(`trabalho/excluir/${id}/`);
    return response;
}

export async function filtrarTrabalhosPorTitulo(titulo: string) {
    const response = await api.get(`trabalho/filtrar-pelo-titulo/?titulo=${titulo}`);
    return response;
}

export async function filtrarTrabalhosPorAnoDefesa(ano_defesa: number) {
    const response = await api.get(`trabalho/filtrar-pelo-ano/?ano=${ano_defesa}`);
    return response;
}

export async function filtrarTrabalhosPeloNomeDoAutor(autor_nome: string) {
    const response = await api.get(`trabalho/filtrar-pelo-nome-autor/?autor_nome=${autor_nome}`);
    return response;
}

export async function obterTrabalhoPeloId(id: number) {
    const response = await api.get(`trabalho/obter-pelo-id/${id}/`)
    return response
}