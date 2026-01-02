import api from "../api/api";
import type { PessoaInterface } from "../interfaces/PessoaInterface";

export async function criarPessoa(pessoaData: PessoaInterface) {
    const response = await api.post("pessoa/criar/", pessoaData);
    return response;
}

export async function atualizarPessoa(pessoaId: number, pessoaData: PessoaInterface) {
    const response = await api.patch(`pessoa/atualizar/${pessoaId}/`, pessoaData);
    return response;
}

export async function obterPessoaPeloId(pessoaId: number) {
    const response = await api.get(`pessoa/obter-pelo-id/${pessoaId}/`);
    return response;
}

export async function listarPessoas() {
    const response = await api.get("pessoa/listar/");
    return response
}

export async function excluirPessoa(pessoaId: number) {
    const response = await api.delete(`pessoa/excluir/${pessoaId}/`)
    return response
}