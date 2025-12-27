import { Breadcrumb, Button, Form, Input, Space } from "antd";
import GenericForm from "../../../../components/GenericForm/GenericForm";
import { HomeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { AutorInterface } from "../../../../interfaces/AutorInterface";
import { AtualizarAutor, criarAutor, filtrarAutorPeloId } from "../../../../services/autor.service";
import { useNavigate, useParams } from "react-router-dom";

function AutorForm() {

    const { id } = useParams<{ id: string }>();
    const [acaoForm, setAcaoForm] = useState<'novo' | 'editar'>('novo');
    const [tituloForm, setTituloForm] = useState('Novo Autor');
    const [form] = Form.useForm<AutorInterface>();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            if (id) {
                setAcaoForm('editar');
                setTituloForm('Editar Autor');
                const response = await filtrarAutorPeloId(Number(id));
                form.setFieldsValue(response.data);


            } else {
                setAcaoForm('novo');
                setTituloForm('Novo Autor');
            }
            
        }
        fetchData();
    }, [id]);

    const handleSave = async (values: AutorInterface) => {
        console.log('Form values:', values);

        if (acaoForm === 'novo') {
            const response = await criarAutor(values);

            console.log('Autor criado com sucesso:', response);

        } else if (acaoForm === 'editar') {
            const response = await AtualizarAutor(Number(id), values);
            navigate('/autores');
            console.log('Autor atualizado com sucesso:', response);
        }
    }

    return (
        <div>
            <Breadcrumb 
                style={{margin: '20px'}}
                items={[
                    {
                        href: '/',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '/autores',
                        title: (
                            <>
                                <UserOutlined />
                                <span>Autores</span>
                            </>
                        ),
                    },
                    {
                    href: '',
                    title: (
                        <>
                            <PlusOutlined />
                            <span>{tituloForm}</span>
                        </>
                        ),
                    },
                ]}
            />

            <GenericForm>
                <Form 
                    form={form}
                    layout="vertical" 
                    style={{ maxWidth: 600 }}
                    onFinish={handleSave}
                >
                    <Form.Item label="Nome" name="nome">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="CPF" name="cpf">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Matrícula" name="matricula">
                        <Input type="text" />
                    </Form.Item>

                    <Space>
                        <Button type="primary" htmlType="submit">Salvar</Button>
                        <Button htmlType="button">Cancelar</Button>
                    </Space>
                </Form>
            </GenericForm>
        </div>
        
    );
}

export default AutorForm;