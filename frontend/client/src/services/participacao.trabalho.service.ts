import api from "../api/api";
import type { ParticipacaoTrabalhoInterface } from "../interfaces/ParticipacaoTrabalho.interface";

export async function criarParticipacaoTrabalho(data: ParticipacaoTrabalhoInterface) {
    const response = api.post('participacao_trabalho/criar/', data);
    return response
}

export async function listarParticipacaoTrabalho() {
    const response = api.get('participacao_trabalho/listar/');
    return response;
}

export async function excluirParticipacaoTrabalho(id: number) {
    const response = await api.delete(`participacao_trabalho/excluir/${id}/`);
    return response;
}