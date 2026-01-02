import api from "../api/api";
import type { UsuarioInterface } from "../interfaces/UsuarioInterface";

export async function criarUsuario(usuarioData: UsuarioInterface) {
    const response = await api.post("/usuario/criar/", usuarioData)
    return response
}

export async function listarUsuarios() {
    const response = await api.get("usuario/listar/")
    return response
}

export async function obterUsuarioPeloId(usuarioId: number) {
    const response = await api.get(`usuario/obter-pelo-id/${usuarioId}/`)
    return response
}

export async function excluirUsuario(usuarioId: number) {
    const response = await api.delete(`usuario/excluir/${usuarioId}/`)
    return response
}

export async function listarGrupos() {
    const response = await api.get("usuario/grupos/listar/")
    return response
}