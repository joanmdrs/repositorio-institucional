import { Breadcrumb, Button, Form, Input, Space, Select } from "antd";
import { useEntityForm } from "../../hooks/useEntityForm";
import type { OrientadorInterface } from "../../interfaces/OrientadorInterface";
import { atualizarOrientador, criarOrientador, obterOrientadorPeloId } from "../../services/orientador.service";
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined, SaveOutlined, TeamOutlined } from "@ant-design/icons";
import GenericForm from "../../components/GenericForm/GenericForm";

const optionsTitulacao = [
    {
        value: 'GRAD',
        label: 'Graduação',
    },
    {
        value: 'ESPE',
        label: 'Especialização'
    }, 
    {
        value: 'MEST',
        label: 'Mestrado'
    },
    {
        value: 'DOUT',
        label: 'Doutorado'
    },
    {
        value: 'POSDOUT',
        label: 'Pós-Doutorado'
    }
]


function OrientadorForm () {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<OrientadorInterface>({
        getById: obterOrientadorPeloId,
        create: criarOrientador,
        update: atualizarOrientador,
        redirectTo: "/orientadores",
        getTitle: (isEdit) => (isEdit ? "Editar Orientador" : "Novo Orientador"),
    });

    return (
        <div>
            {/* Breadcrumb */}
            <Breadcrumb
                style={{ margin: "16px" }}
                items={[
                    {
                        href: "/",
                        title: <HomeOutlined />,
                    },
                    {
                        href: "/autores",
                        title: (
                            <>
                                <TeamOutlined />
                                <span>Orientadores</span>
                            </>
                        ),
                    },
                    {
                        title: (
                            <>
                               { isEdit ? <SaveOutlined /> : <PlusOutlined /> }
                                <span>{title}</span>
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
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[
                            { required: true, message: "Informe o nome" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="CPF"
                        name="cpf"
                        rules={[
                            { required: true, message: "Informe o CPF" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { type: "email", message: "Email inválido" },
                            { required: true, message: "Informe o email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Matrícula"
                        name="matricula"
                        rules={[
                            { required: true, message: "Informe a matrícula" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Titulação:" 
                        name="titulacao" 
                        style={{width: 'fit-content'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select
                            defaultValue="Selecione"
                            options={optionsTitulacao}
                        />
                    </Form.Item>

                    {/* Ações */}
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={loading}
                        >
                            {isEdit ? "Atualizar" : "Salvar"}
                        </Button>

                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate("/orientadores")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default OrientadorForm