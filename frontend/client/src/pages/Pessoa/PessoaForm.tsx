import { Breadcrumb, Button, Form, Input, Select, Space } from "antd";
import {
    HomeOutlined,
    PlusOutlined,
    UserOutlined,
    SaveOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useEntityForm } from "../../hooks/useEntityForm";
import GenericForm from "../../components/GenericForm/GenericForm";
import type { PessoaInterface } from "../../interfaces/PessoaInterface";
import { atualizarPessoa, criarPessoa, obterPessoaPeloId } from "../../services/pessoa.service";

const optionsTitulacao = [
    {
        value: "GRAD",
        label: "Graduação"
    },
    {
        value: "ESPE",
        label: "Especialista"
    },
    {
        value: "MEST",
        label: "Mestrado"
    },
    {
        value: "DOUT",
        label: "Doutorado"
    }, 
    {
        value: "POSDOUT",
        label: "Pós-Doutorado"
    }
]

function PessoaForm() {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<PessoaInterface>({
        getById: obterPessoaPeloId,
        create: criarPessoa,
        update: atualizarPessoa,
        redirectTo: "/pessoas",
        getTitle: (isEdit) => (isEdit ? "Editar Pessoa" : "Nova Pessoa"),
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
                        href: "/pessoas",
                        title: (
                            <>
                                <UserOutlined />
                                <span>Pessoas</span>
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
                        label="Telefone"
                        name="telefone"
                        rules={[
                            { required: true, message: "Informe o email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Usuário"
                        name="username"
                        rules={[
                            { required: true, message: "Informe o usuário"}
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Por favor, informe sua senha!' }]}
                    >
                        <Input.Password name="password" />
                    </Form.Item>
                    
                    <Form.Item
                        label="Grupos"
                        name="groups"
                        rules={[{ required: true, message: 'Por favor, selecione um grupo!'}]}
                    >
                        <Select
                            mode="multiple"
                            showSearch 
                            options={optionsTitulacao} />
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

export default PessoaForm;
