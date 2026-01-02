import { Breadcrumb, Button, Form, Space, Select } from "antd";
import { useEntityForm } from "../../hooks/useEntityForm";
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined, SaveOutlined, TeamOutlined } from "@ant-design/icons";
import GenericForm from "../../components/GenericForm/GenericForm";
import { useEffect, useState } from "react";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import type { ParticipacaoTrabalhoInterface } from "../../interfaces/ParticipacaoTrabalho.interface";
import { criarParticipacaoTrabalho, listarParticipacaoTrabalho } from "../../services/participacao.trabalho.service";
import { listarTrabalhos } from "../../services/trabalho.service";


function ParticipacaoTrabalhoForm () {
    const {
        form,
        loading,
        isEdit,
        title,
        handleSubmit,
        navigate,
    } = useEntityForm<ParticipacaoTrabalhoInterface>({
        getById: null,
        create: criarParticipacaoTrabalho,
        update: null,
        redirectTo: "/participacoes-trabalho",
        getTitle: (isEdit) => (isEdit ? "Editar Participação" : "Nova Participação"),
    });

    const mapOptions = <T,>(
        data: T[],
        valueKey: keyof T,
        labelKey: keyof T
    ): DefaultOptionType[] =>
        data.map(item => ({
            value: item[valueKey] as string | number,
            label: String(item[labelKey]),
        }));

    const [optionsTrabalho, setOptionsTrabalho] = useState<SelectProps["options"]>([]);
    const [optionsPessoas, setOptionsPessoas] = useState<SelectProps["options"]>([])

    useEffect(() => {
        const loadData = async () => {
            const [
                trabalhosRes,
                pessoasRes
            ] = await Promise.all([
                listarTrabalhos(),
                listarParticipacaoTrabalho(),
            ]);

            setOptionsTrabalho(mapOptions(trabalhosRes.data, "id", "nome"));
            setOptionsPessoas(mapOptions(pessoasRes.data, "id", "termo"));

        };

        loadData();
    }, []);

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
                        href: "/participacoes-trabalho",
                        title: (
                            <>
                                <TeamOutlined />
                                <span>Participações</span>
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
                    style={{ }}
                    onFinish={handleSubmit}
                >

                    <Form.Item 
                        label="Trabalho" 
                        name="trabalho" 
                        style={{width: '100%'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select
                            defaultValue="Selecione"
                            showSearch
                            allowClear
                            popupMatchSelectWidth={false}
                            options={optionsTrabalho}
                        />
                    </Form.Item>

                    <Form.Item 
                        label="Pessoa" 
                        name="pessoa" 
                        style={{width: '100%'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select
                            defaultValue="Selecione"
                            showSearch
                            allowClear
                            popupMatchSelectWidth={false}
                            options={optionsPessoas}
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
                            onClick={() => navigate("/participacoes-trabalho")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default ParticipacaoTrabalhoForm