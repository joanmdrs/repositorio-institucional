import { Button, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { PalavraChaveInterface } from "../../interfaces/PalavraChaveInterface";
import { excluirPalavraChave, listarPalavrasChave } from "../../services/palavra.chave.service";


function PalavraChaveList() {
    const navigate = useNavigate();

    const { data, loading, handleDelete } =
        useEntityList<PalavraChaveInterface>({
        fetchAll: listarPalavrasChave,
        deleteById: excluirPalavraChave,
    });

    const colunasPalavrasChave = [
        { title: "Termo", dataIndex: "termo", key: "termo" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: PalavraChaveInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-palavra-chave/${record.id}`)}
                    >
                        Editar
                    </Button>

                    <Popconfirm
                        title="Deseja realmente excluir esta palavra-chave?"
                        okText="Sim"
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
            columns={colunasPalavrasChave}
            rowKey="id"
        />
    );
}

export default PalavraChaveList;
