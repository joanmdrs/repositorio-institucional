import { Button, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { OrientadorInterface } from "../../interfaces/OrientadorInterface";
import { excluirOrientador, listarOrientadores } from "../../services/orientador.service";


function OrientadorList() {
    const navigate = useNavigate();

    const { data, loading, handleDelete } =
        useEntityList<OrientadorInterface>({
        fetchAll: listarOrientadores,
        deleteById: excluirOrientador,
    });

    const colunasOrientadores = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "CPF", dataIndex: "cpf", key: "cpf" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Matrícula", dataIndex: "matricula", key: "matricula" },
        { title: "Titulação", dataIndex: "titulacao", key: "titulacao"},
        {
            title: "Ações",
            key: "acoes",
            render: (record: OrientadorInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-orientador/${record.id}`)}
                    >
                        Editar
                    </Button>

                    <Popconfirm
                        title="Deseja realmente excluir este orientador?"
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
            columns={colunasOrientadores}
            rowKey="id"
        />
    );
}

export default OrientadorList;
