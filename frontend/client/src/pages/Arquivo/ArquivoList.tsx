import { Button, Popconfirm, Space, Table } from "antd";
import { useEntityList } from "../../hooks/useEntityList";
import type { ArquivoDetail } from "../../interfaces/ArquivoInterface";
import { excluirArquivo, listarArquivos } from "../../services/arquivo.service";
import { formatarDatetime } from "../../utils/converteDateTime";


function ArquivoList() {

    const { data, loading, handleDelete } =
        useEntityList<ArquivoDetail>({
        fetchAll: listarArquivos,
        deleteById: excluirArquivo,
    });

    const colunasArquivo = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Título", dataIndex: "trabalho_titulo", key: "trabalho_titulo"},
        { title: "Criado em", dataIndex: "criado_em", key: "criado_em", render: (criado_em: string) => (
            <Space>
                {formatarDatetime(criado_em)}
            </Space>
        )},
        {
            title: "Ações",
            key: "acoes",
            render: (record: ArquivoDetail) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => window.open(`http://localhost:8000/${record.arquivo}`, "_blank")}
                    >
                        Visualizar
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
            columns={colunasArquivo}
            rowKey="id"
        />
    );
}

export default ArquivoList;
