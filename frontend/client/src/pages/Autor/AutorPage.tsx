import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AutorList from "./AutorList";


function AutorPage() {
    const navigate = useNavigate();

    return (
        <div>
            <Breadcrumb
                style={{ margin: '10px 10px 0' }}
                items={[
                    {
                        title: <HomeOutlined />,
                    },
                    {
                        title: (
                            <>
                                <UserOutlined />
                                <span> Autores</span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/novo-autor")}
                >
                    Novo Autor
                </Button>
            </Space>

            <AutorList />
        </div>
    );
}

export default AutorPage;
