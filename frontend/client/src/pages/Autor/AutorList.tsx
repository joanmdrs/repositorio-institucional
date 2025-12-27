import { Button, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import type { AutorInterface } from "../../interfaces/AutorInterface";
import { excluirAutor, listarAutores } from "../../services/autor.service";
import { useEntityList } from "../../hooks/useEntityList";


function AutorList() {
    const navigate = useNavigate();

    const { data, loading, handleDelete } =
        useEntityList<AutorInterface>({
        fetchAll: listarAutores,
        deleteById: excluirAutor,
    });

    const colunasAutores = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "CPF", dataIndex: "cpf", key: "cpf" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Matrícula", dataIndex: "matricula", key: "matricula" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: AutorInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-autor/${record.id}`)}
                    >
                        Editar
                    </Button>

                    <Popconfirm
                        title="Deseja realmente excluir este autor?"
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
            columns={colunasAutores}
            rowKey="id"
        />
    );
}

export default AutorList;
