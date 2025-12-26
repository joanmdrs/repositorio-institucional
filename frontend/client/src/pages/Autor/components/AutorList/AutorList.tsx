import { Table } from "antd"


function AutorList () {

    const columns = [
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
            render: () => (
                <span>
                    <a style={{ marginRight: 16 }}>Editar</a>
                    <a>Excluir</a>
                </span>
            ),
        }
    ];  
    return (
        <div>
            <Table 
                
                columns={columns}
                dataSource={[]}
            />
        </div>
    )
}

export default AutorList