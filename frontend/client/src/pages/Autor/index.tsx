import { Breadcrumb, Button, Space } from "antd";
import { HomeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import AutorList from "./AutorList";
import BoxContent from "../../components/BoxContent/BoxContent";
import { useNavigate } from "react-router-dom";

function AutorBreadcrumb() {

    return (
        <Breadcrumb
            style={{marginTop: '10px', marginLeft: '10px'}}
            items={[
            {
                href: '',
                title: <HomeOutlined />,
            },
            {
                href: '',
                title: (
                <>
                    <UserOutlined />
                    <span>Autores</span>
                </>
                ),
            },
            ]}
        />
    )
        
}

function AutorPage() {
    const navigate = useNavigate();
    return (
        <BoxContent>
            
            <AutorBreadcrumb />
            <Space>
                <Button 
                    onClick={() => navigate("/novo-autor")}
                    icon={<PlusOutlined />} type="primary">Adicionar Autor</Button>
            </Space>
            
            
            <AutorList />

        </BoxContent>
    )
}

export default AutorPage;