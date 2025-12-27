import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import OrientadorList from "./OrientadorList";


function OrientadorPage() {
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
                                <TeamOutlined />
                                <span> Orientadores </span>
                            </>
                        ),
                    },
                ]}
            />

            <Space style={{ margin: '16px 0' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/novo-orientador")}
                >
                    Novo Orientador
                </Button>
            </Space>

            <OrientadorList />
        </div>
    );
}

export default OrientadorPage;
