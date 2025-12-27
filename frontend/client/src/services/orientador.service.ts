import api from "../api/api";
import type { OrientadorInterface } from "../interfaces/OrientadorInterface";

export async function criarOrientador(dados_orientador: OrientadorInterface) {
    const response = await api.post("orientador/criar/", {dados_orientador: dados_orientador});
    return response;
}

export async function listarOrientadores() { 
    const response = await api.get("orientador/listar/");
    return response;
}

export async function atualizarOrientador(id: number, dados_orientador_atualizados: OrientadorInterface) {
    const response = await api.patch(`orientador/atualizar/${id}/`, {dados_orientador_atualizados: dados_orientador_atualizados });
    return response;
}

export async function excluirOrientador(id: number) {
    const response = await api.delete(`orientador/excluir/${id}/`);
    return response;
}

export async function obterOrientadorPeloId(id: number){
    const response = await api.get(`orientador/obter-pelo-id/${id}/`);
    return response;
}