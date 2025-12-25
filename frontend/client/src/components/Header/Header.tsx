import { Layout, Dropdown, Avatar, Space } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logoFCST from "../../assets/fcst.png";
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    color: "#fff",
    height: 64,
    lineHeight: '64px',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const logoStyle: React.CSSProperties = { 
    width: 100,

}

function ComponentHeader() {


    const items: MenuProps["items"] = [
        {
            key: "profile",
            label: <a href="/perfil">Perfil</a>,
        },
        {
            key: "logout",
            label: (
            <div onClick={() => { 
                }}
            >
            Logout
            </div>
        ),
        },
    ];

    return (
        <Header style={headerStyle}>
            <img src={logoFCST} style={logoStyle} />
            <Dropdown menu={{ items }} placement="bottomRight">
                <Space style={{ cursor: "pointer", color: "#fff" }}>
                    <Avatar icon={<UserOutlined />} />
                </Space>
            </Dropdown>
        </Header>
    );
}

export default ComponentHeader;