import api from "../api/api";
import type { DepartamentoInterface } from "../interfaces/DepartamentoInterface";

export async function criarDepartamento(data: DepartamentoInterface) {
    const response = await api.post("departamento/criar/", data);
    return response;
}

export async function listarDepartamentos() { 
    const response = await api.get("departamento/listar/");
    return response;
}

export async function atualizarDepartamento(id: number, data: DepartamentoInterface) {
    const response = await api.put(`departamento/atualizar/${id}/`, data);
    return response;
}

export async function excluirDepartamento(id: number) {
    const response = await api.delete(`departamento/excluir/${id}/`);
    return response;
}

export async function filtrarDepartamentosPorNome(nome: string) {
    const response = await api.get(`departamento/filtrar-pelo-nome/?departamento_nome=${nome}`);
    return response;
}

export async function obterDepartamentoPeloId(id: number) {
    const response = await api.get(`departamento/obter-pelo-id/${id}/`)
    return response
    
}