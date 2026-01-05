import { Button, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { PessoaInterface } from "../../interfaces/PessoaInterface";
import { excluirPessoa, listarPessoas } from "../../services/pessoa.service";

function PessoaList() {
    const navigate = useNavigate();

    const { data, loading, handleDelete } =
        useEntityList<PessoaInterface>({
        fetchAll: listarPessoas,
        deleteById: excluirPessoa,
    });

    const colunasPessoas = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: PessoaInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-pessoa/${record.id}`)}
                    >
                        Editar
                    </Button>

                    <Popconfirm
                        title="Deseja realmente excluir esta pessoa?"
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
            columns={colunasPessoas}
            rowKey="id"
        />
    );
}

export default PessoaList;
