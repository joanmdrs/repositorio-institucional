import { Button, Popconfirm, Space, Table } from "antd"
import { useEffect, useState } from "react";
import { listarAutores } from "../../../../services/autor.service";
import { useNavigate } from "react-router-dom";
import type { AutorInterface } from "../../../../interfaces/AutorInterface";


function AutorList () {

    const [dadosAutores, setDadosAutores] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await listarAutores();
            setDadosAutores(response.data);
        }
        fetchData();
    }, []);

    const colunasAutores = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Matrícula',
            dataIndex: 'matricula',
            key: 'matricula',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record: AutorInterface) => (
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
                        
                    >
                        <Button type="link" danger>
                            Excluir
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        }
    ];  
    return (
        <div>
            <Table 
                columns={colunasAutores}
                dataSource={dadosAutores}
                rowKey="id"
            />
        </div>
    )
}

export default AutorList