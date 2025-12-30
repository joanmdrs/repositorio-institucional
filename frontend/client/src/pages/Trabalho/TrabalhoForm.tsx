import { Breadcrumb, Button, Form, Input, Space, Select, Upload, message } from "antd";
import { useEntityForm } from "../../hooks/useEntityForm";
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined, SaveOutlined, FileTextOutlined } from "@ant-design/icons";
import GenericForm from "../../components/GenericForm/GenericForm";
import { useEffect, useState } from "react";
import type { TrabalhoInterface } from "../../interfaces/TrabalhoInterface";
import { atualizarTrabalho, criarTrabalho, obterTrabalhoPeloId } from "../../services/trabalho.service";
import { listarAutores } from "../../services/autor.service";
import { listarCursos } from "../../services/curso.service";
import { listarOrientadores } from "../../services/orientador.service";
import { listarPalavrasChave } from "../../services/palavra.chave.service";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";


const optionsTipo = [
    {
        value: "ART",
        label: "Artigo"
    },
    {
        value: "MON",
        label: "Monogragia"
    },
    {
        value: "DIS",
        label: "Dissertação"
    },
    {
        value: "TES",
        label: "Tese"
    }
]

const optionsIdioma = [
    {
        value: "inglês",
        label: "Inglês"
    },
    {
        value: "português",
        label: "Português"
    },
    {
        value: "espanhol",
        label: "Espanhol"
    }
]

function TrabalhoForm () {
    const {
        form,
        loading,
        isEdit,
        title,
        navigate,
    } = useEntityForm<TrabalhoInterface>({
        getById: obterTrabalhoPeloId,
        create: criarTrabalho,
        update: atualizarTrabalho,
        redirectTo: "/trabalhos",
        getTitle: (isEdit) => (isEdit ? "Editar Trabalho" : "Novo Trabalho"),
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

    const [optionsAutores, setOptionsAutores] = useState<SelectProps["options"]>([]);
    const [optionsOrientadores, setOptionsOrientadores] = useState<SelectProps["options"]>([]);
    const [optionsCoorientadores, setOptionsCoorientadores] = useState<SelectProps["options"]>([]);
    const [optionsCurso, setOptionsCurso] = useState<SelectProps["options"]>([]);
    const [optionsPalavraChave, setOptionsPalavraChave] = useState<SelectProps["options"]>([])
    const existeArquivo = (isEdit && form.getFieldValue("arquivos")?.length > 0)


    useEffect(() => {
        const loadData = async () => {
            const [
                autoresRes,
                cursosRes,
                orientadoresRes,
                palavrasRes
            ] = await Promise.all([
                listarAutores(),
                listarCursos(),
                listarOrientadores(),
                listarPalavrasChave(),
            ]);

            setOptionsAutores(mapOptions(autoresRes.data, "id", "nome"));
            setOptionsCurso(mapOptions(cursosRes.data, "id", "nome"));
            setOptionsOrientadores(mapOptions(orientadoresRes.data, "id", "nome"));
            setOptionsCoorientadores(mapOptions(orientadoresRes.data, "id", "nome"));
            setOptionsPalavraChave(mapOptions(palavrasRes.data, "id", "termo"));

        };

        loadData();
    }, []);


    const handleSave = async (values: TrabalhoInterface & { arquivo: File }) => {
        const formData = new FormData();

        const simpleFields = [
            "titulo",
            "resumo",
            "data_defesa",
            "tipo",
            "idioma",
            "curso",
            "orientador",
            "coorientador",
        ] as const;

        simpleFields.forEach((field) => {
            if (values[field]) {
                formData.append(field, String(values[field]));
            }
        });

        values.autores?.forEach((id) =>
            formData.append("autores", String(id))
        );

        values.palavras_chave?.forEach((id) =>
            formData.append("palavras_chave", String(id))
        );

        if (values.arquivo) {
            formData.append("arquivo", values.arquivo);
        }

        if (isEdit) {
            await atualizarTrabalho(form.getFieldValue("id"), formData);
        } else {
            await criarTrabalho(formData);
        }

        message.success(
            isEdit ? "Registro atualizado com sucesso" : "Registrado realizado com sucesso"
        );
        navigate("/trabalhos");
    };



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
                        href: "/trabalhos",
                        title: (
                            <>
                                <FileTextOutlined />
                                <span>Trabalhos</span>
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
                    onFinish={handleSave}
                >
                    <Form.Item
                        label="Título"
                        name="titulo"
                        rules={[
                            { required: true, message: "Informe o título" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Resumo"
                        name="resumo"
                        rules={[
                            { required: true, message: "Informe o resumo" },
                        ]}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item 
                        label="Palavras-chave" 
                        name="palavras_chave" 
                        style={{width: '50%'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select
                            mode="multiple"
                            defaultValue="Selecione"
                            showSearch
                            allowClear
                            popupMatchSelectWidth={false}
                            options={optionsPalavraChave}
                        />
                    </Form.Item>

                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                        <Form.Item
                            label="Data da Defesa"
                            name="data_defesa"
                            style={{width: 'fit-content'}}
                            rules={[
                                { required: true, message: "Informe a data da defesa " },
                            ]}
                        >
                            <Input type="date" />

                        </Form.Item>

                        <Form.Item 
                            label="Tipo" 
                            name="tipo" 
                            style={{width: '15%'}}
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                            <Select
                                placeholder="Selecione"
                                options={optionsTipo}
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Idioma" 
                            name="idioma" 
                            style={{width: '15%'}}
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                            <Select
                                placeholder="Selecione"
                                options={optionsIdioma}
                                popupMatchSelectWidth={false}
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Curso" 
                            name="curso" 
                            style={{width: '15%'}}
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                            <Select
                                placeholder="Selecione"
                                options={optionsCurso}
                                popupMatchSelectWidth={false}
                            />
                        </Form.Item>

                    </div>

                    <div> 
                        <Form.Item 
                            label="Autores" 
                            name="autores" 
                            style={{width: '15%'}}
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                            <Select
                                mode="multiple"
                                placeholder="Selecione"
                                showSearch
                                allowClear
                                options={optionsAutores}
                                popupMatchSelectWidth={false}
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Orientador" 
                            name="orientador" 
                            style={{width: '15%'}}
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                            <Select
                                placeholder="Selecione"
                                options={optionsOrientadores}
                                popupMatchSelectWidth={false}
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Coorientador" 
                            name="coorientador" 
                            style={{width: '15%'}}
                            rules={[{ required: false, message: 'Por favor, selecione uma opção!' }]}>
                            <Select
                                placeholder="Selecione"
                                options={optionsCoorientadores}
                                popupMatchSelectWidth={false}
                            />
                        </Form.Item>
                    </div>

                    {isEdit && form.getFieldValue("arquivos")?.length > 0 && (
                        <Form.Item label="Arquivo atual">
                            <a
                                href={`http://localhost:8000/${form.getFieldValue("arquivos")[0].arquivo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visualizar arquivo atual
                            </a>
                        </Form.Item>
                    )}


                    <Form.Item
                        label={existeArquivo ? "Novo Arquivo (opcional)" : "Arquivo"}
                        name="arquivo"
                        valuePropName="file"
                        getValueFromEvent={(e) => e?.file}
                        rules={[
                            { required: !existeArquivo, message: "Selecione um arquivo" }
                        ]}
                    >
                        <Upload
                            beforeUpload={() => false}
                            maxCount={1}
                            accept=".pdf,.doc,.docx"
                        >
                            <Button icon={<FileTextOutlined />}>
                                Selecionar arquivo
                            </Button>
                        </Upload>
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
                            onClick={() => navigate("/trabalhos")}
                        >
                            Voltar
                        </Button>
                    </Space>
                </Form>
            </GenericForm>
            
        </div>
    );
}

export default TrabalhoForm