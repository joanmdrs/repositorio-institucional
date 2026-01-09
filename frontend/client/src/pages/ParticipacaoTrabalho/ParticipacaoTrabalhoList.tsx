import { Button, Space, Table } from "antd";
import { useEntityList } from "../../hooks/useEntityList";
import type { ParticipacaoTrabalhoInterface } from "../../interfaces/ParticipacaoTrabalho.interface";
import { excluirParticipacaoTrabalho, listarParticipacaoTrabalho } from "../../services/participacao.trabalho.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";


function ParticipacaoTrabalhoList() {

    const navigate = useNavigate()
    const { data, loading, handleDelete } =
        useEntityList<ParticipacaoTrabalhoInterface>({
        fetchAll: listarParticipacaoTrabalho,
        deleteById: excluirParticipacaoTrabalho,
    });

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedRecord, setSelectedRecord] =
        useState<ParticipacaoTrabalhoInterface | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const openDeleteModal = (record: ParticipacaoTrabalhoInterface) => {
        setSelectedRecord(record);
        setOpenConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedRecord) return;

        try {
            setConfirmLoading(true);
            await handleDelete(Number(selectedRecord.id));
            setOpenConfirm(false);
            setSelectedRecord(null);
        } finally {
            setConfirmLoading(false);
        }
    };

    const colunasParticipacao = [
        { title: "Nome", dataIndex: "nome_pessoa", key: "nome_pessoa" },
        { title: "Trabalho", dataIndex: "titulo_trabalho", key: "titulo_trabalho" },
        { title: "Papel", dataIndex: "nome_papel", key: "nome_papel" },
        {
            title: "Ações",
            key: "acoes",
            render: (record: ParticipacaoTrabalhoInterface) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/editar-participacao/${record.id}`)}
                    >
                        Editar
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => openDeleteModal(record)}
                    >
                        Excluir
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                loading={loading}
                dataSource={data}
                columns={colunasParticipacao}
                rowKey="id"
            />
            <ConfirmModal
                open={openConfirm}
                title="Confirmar exclusão"
                danger
                loading={confirmLoading}
                confirmText="Excluir"
                description={
                    <p>
                        Tem certeza que deseja excluir ?
                    </p>
                }
                onConfirm={handleConfirmDelete}
                onCancel={() => setOpenConfirm(false)}
            />
        </>
        

        
    );
}

export default ParticipacaoTrabalhoList;
