import api from "../api/api";
import type { PalavraChaveInterface } from "../interfaces/PalavraChaveInterface";

export async function criarPalavraChave(dados: PalavraChaveInterface) {
    const response = await api.post("palavra_chave/criar/", {dados_palavra_chave: dados});
    return response;
}

export async function listarPalavrasChave() { 
    const response = await api.get("palavra_chave/listar/");
    return response;
}

export async function atualizarPalavraChave(id: number, dadosAtualizados: PalavraChaveInterface) {
    const response = await api.patch(`palavra_chave/atualizar/${id}/`, {dados_palavra_chave_atualizados: dadosAtualizados});
    return response;
}

export async function excluirPalavraChave(id: number) {
    const response = await api.delete(`palavra_chave/excluir/${id}/`);
    return response;
}

export async function filtrarPalavrasChavePorNome(termo: string) {
    const response = await api.get(`palavra_chave/buscar-pelo-termo/?termo=${termo}`);
    return response;
}   

export async function obterPalavraChavePeloId(id: number) {
    const response = await api.get(`palavra_chave/obter-pelo-id/${id}/`);
    return response;
}