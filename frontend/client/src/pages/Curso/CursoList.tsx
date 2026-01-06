import { Button, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { CursoInterface } from "../../interfaces/CursoInterface";
import { excluirCurso, listarCursos } from "../../services/curso.service";


function CursoList() {
    const navigate = useNavigate();

    const { data, loading, handleDelete } =
        useEntityList<CursoInterface>({
        fetchAll: listarCursos,
        deleteById: excluirCurso,
    });

    const colunasCursos = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Sigla", dataIndex: "sigla", key: "sigla" },
        { title: "Nível", dataIndex: "nivel", key: "nivel"},
        { title: "Departamento", dataIndex: "departamento_nome", key: "departamento_nome"},
        {
            title: "Ações",
            key: "acoes",
            render: (record: CursoInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-curso/${record.id}`)}
                    >
                        Editar
                    </Button>

                    <Popconfirm
                        title="Deseja realmente excluir este curso?"
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
            columns={colunasCursos}
            rowKey="id"
        />
    );
}

export default CursoList;
