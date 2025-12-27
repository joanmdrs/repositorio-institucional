import api from "../api/api";
import type { AutorInterface } from "../interfaces/AutorInterface";


export async function criarAutor(dadosAutor: AutorInterface) {
    console.log('Dados do autor a serem criados:', dadosAutor);
    const response = await api.post("autor/criar/", { dados_autor: dadosAutor });
    return response;
}

export async function listarAutores() { 
    const response = await api.get("autor/listar/");
    return response;
}

export async function atualizarAutor(id: number, data: AutorInterface) {
    const response = await api.patch(`autor/atualizar/${id}/`, {dados_autor_atualizados: data});
    return response;
}

export async function excluirAutor(id: number) {
    const response = await api.delete(`autor/excluir/${id}/`);
    return response;
}

export async function filtrarAutorPeloId(id: number) {
    const response = await api.get(`autor/filtrar-pelo-id/${id}/`);
    return response;
}