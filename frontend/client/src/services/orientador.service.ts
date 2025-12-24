import api from "../api/api";
import type { OrientadorInterface } from "../interfaces/OrientadorInterface";

export async function criarOrientador(data: OrientadorInterface) {
    const response = await api.post("orientador/criar/", data);
    return response.data;
}

export async function listarOrientadores() { 
    const response = await api.get("orientador/listar/");
    return response.data;
}

export async function atualizarOrientador(id: number, data: OrientadorInterface) {
    const response = await api.put(`orientador/atualizar/${id}/`, data);
    return response.data;
}

export async function deletarOrientador(id: number) {
    const response = await api.delete(`orientador/deletar/${id}/`);
    return response.data;
}