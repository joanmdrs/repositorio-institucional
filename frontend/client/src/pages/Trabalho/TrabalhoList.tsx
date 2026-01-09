import { Button, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { TrabalhoInterface } from "../../interfaces/TrabalhoInterface";
import { excluirTrabalho, listarTrabalhos } from "../../services/trabalho.service";


function TrabalhoList() {
    const navigate = useNavigate();

    const { data, loading, handleDelete } =
        useEntityList<TrabalhoInterface>({
        fetchAll: listarTrabalhos,
        deleteById: excluirTrabalho,
    });

    const colunasTrabalho = [
        { title: "ID", dataIndex: "id", key: "id"},
        { title: "Título", dataIndex: "titulo", key: "titulo" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: TrabalhoInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-trabalho/${record.id}`)}
                    >
                        Editar
                    </Button>

                    <Popconfirm
                        title="Deseja realmente excluir este trabalho?"
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
            columns={colunasTrabalho}
            rowKey="id"
        />
    );
}

export default TrabalhoList;
