import api from "../api/api";
import type { ArquivoCreate } from "../interfaces/ArquivoInterface";


export async function criarArquivo(data: ArquivoCreate) {
    const response = await api.post("arquivo/criar/", data);
    return response.data;
}

export async function listarArquivos() { 
    const response = await api.get("arquivo/listar/");
    return response.data;
}

export async function deletarArquivo(id: number) {
    const response = await api.delete(`arquivo/deletar/${id}/`);
    return response.data;
}