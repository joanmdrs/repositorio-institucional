import { Breadcrumb, Button, Form, Input, Space } from "antd";
import GenericForm from "../../../../components/GenericForm/GenericForm";
import { HomeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";


function AutorForm() {
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
                            <span>Novo Autor</span>
                        </>
                        ),
                    },
                ]}
            />

            <GenericForm>
                <Form 
                    layout="vertical" 
                    
                    style={{ maxWidth: 600 }}
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