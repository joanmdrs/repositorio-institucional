import { Button, Popconfirm, Space, Table } from "antd";
import { useEntityList } from "../../hooks/useEntityList";
import type { ParticipacaoTrabalhoInterface } from "../../interfaces/ParticipacaoTrabalho.interface";
import { excluirParticipacaoTrabalho, listarParticipacaoTrabalho } from "../../services/participacao.trabalho.service";


function ParticipacaoTrabalhoList() {

    const { data, loading, handleDelete } =
        useEntityList<ParticipacaoTrabalhoInterface>({
        fetchAll: listarParticipacaoTrabalho,
        deleteById: excluirParticipacaoTrabalho,
    });

    const colunasParticipacao = [
        { title: "Nome", dataIndex: "nome_pessoa", key: "nome_pessoa" },
        { title: "Trabalho", dataIndex: "titulo_trabalho", key: "titulo_trabalho" },
        { title: "Papel", dataIndex: "nome_papel", key: "nome_papel" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: ParticipacaoTrabalhoInterface) => (
                <Space>
                    <Popconfirm
                        title="Deseja realmente excluir este item ?"
                        cancelText="Não"
                        onConfirm={() => handleDelete(Number(record.id))}
                    >
                        <Button type="link" danger>
                            Excluir
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            loading={loading}
            dataSource={data}
            columns={colunasParticipacao}
            rowKey="id"
        />
    );
}

export default ParticipacaoTrabalhoList;
