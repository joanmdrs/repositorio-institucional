import { Button, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { DepartamentoInterface } from "../../interfaces/DepartamentoInterface";
import { excluirDepartamento, listarDepartamentos } from "../../services/departamento.service";


function DepartamentoList() {
    const navigate = useNavigate();

    const { data, loading, handleDelete } =
        useEntityList<DepartamentoInterface>({
        fetchAll: listarDepartamentos,
        deleteById: excluirDepartamento,
    });

    const colunasDepartamentos = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Sigla", dataIndex: "sigla", key: "sigla" },
        { title: "Código", dataIndex: "codigo", key: "codigo" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: DepartamentoInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-departamento/${record.id}`)}
                    >
                        Editar
                    </Button>

                    <Popconfirm
                        title="Deseja realmente excluir este departamento?"
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
            columns={colunasDepartamentos}
            rowKey="id"
        />
    );
}

export default DepartamentoList;
