import api from "../api/api";
import type { CursoInterface } from "../interfaces/CursoInterface"; 

export async function criarCurso(data: CursoInterface) {
    const response = await api.post("curso/criar/", data);
    return response.data;
}

export async function listarCursos() { 
    const response = await api.get("curso/listar/");
    return response.data;
}

export async function atualizarCurso(id: number, data: CursoInterface) {
    const response = await api.put(`curso/atualizar/${id}/`, data);
    return response.data;
}

export async function deletarCurso(id: number) {
    const response = await api.delete(`curso/deletar/${id}/`);
    return response.data;
}

export async function filtrarCursosPorNome(nome: string) {
    const response = await api.get(`curso/filtrar-pelo-nome/?curso_nome=${nome}`);
    return response.data;
}