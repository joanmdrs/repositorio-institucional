import { Button, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEntityList } from "../../hooks/useEntityList";
import type { UsuarioInterface } from "../../interfaces/UsuarioInterface";
import { excluirUsuario, listarUsuarios } from "../../services/usuario.service";

function UsuarioList() {
    const navigate = useNavigate();

    const { data, loading, handleDelete } =
        useEntityList<UsuarioInterface>({
        fetchAll: listarUsuarios,
        deleteById: excluirUsuario,
    });

    const colunasUsuarios = [
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "E-mail", dataIndex: "email", key: "email"},
        { title: "Grupos", dataIndex: "groups", key: "groups"}
    ];

    return (
        <Table
            loading={loading}
            dataSource={data}
            columns={colunasUsuarios}
            rowKey="id"
        />
    );
}

export default UsuarioList;
