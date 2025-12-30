import api from "../api/api";


export async function criarArquivo(formData: FormData) {
    const response = await api.post("arquivo/criar/", formData);
    return response;
}

export async function listarArquivos() { 
    const response = await api.get("arquivo/listar/");
    return response;
}

export async function excluirArquivo(id: number) {
    const response = await api.delete(`arquivo/excluir/${id}/`);
    return response;
}

export async function obterArquivoPeloId(id: number) {
    const response = await api.get(`arquivo/obter-pelo-id/${id}/`);
    return response
}