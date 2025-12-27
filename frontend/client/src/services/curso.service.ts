import api from "../api/api";
import type { CursoInterface } from "../interfaces/CursoInterface"; 

export async function criarCurso(dados_curso: CursoInterface) {
    console.log("Dados do curso: ", dados_curso)
    const response = await api.post("curso/criar/", {dados_curso: dados_curso});
    return response;
}

export async function listarCursos() { 
    const response = await api.get("curso/listar/");
    console.log(response)
    return response;
}

export async function atualizarCurso(id: number, dados_curso_atualizados: CursoInterface) {
    const response = await api.patch(`curso/atualizar/${id}/`, {dados_curso_atualizados: dados_curso_atualizados});
    return response;
}

export async function excluirCurso(id: number) {
    const response = await api.delete(`curso/excluir/${id}/`);
    return response;
}

export async function filtrarCursosPorNome(nome: string) {
    const response = await api.get(`curso/filtrar-pelo-nome/?curso_nome=${nome}`);
    return response;
}

export async function obterCursoPeloId(id: number){
    const response = await api.get(`curso/obter-pelo-id/${id}/`)
    return response
}