import { Breadcrumb, Button, Form, Input, Space } from "antd";
import {
    HomeOutlined,
    PlusOutlined,
    UserOutlined,
    SaveOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useEntityForm } from "../../hooks/useEntityForm";
import type { AutorInterface } from "../../interfaces/AutorInterface";
import { atualizarAutor, criarAutor, filtrarAutorPeloId } from "../../services/autor.service";
import GenericForm from "../../components/GenericForm/GenericForm";


function AutorForm() {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<AutorInterface>({
        getById: filtrarAutorPeloId,
        create: criarAutor,
        update: atualizarAutor,
        redirectTo: "/autores",
        getTitle: (isEdit) => (isEdit ? "Editar Autor" : "Novo Autor"),
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
                                <UserOutlined />
                                <span>Autores</span>
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
                            onClick={() => navigate("/autores")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default AutorForm;
