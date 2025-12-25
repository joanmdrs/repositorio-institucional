import React, { useState } from 'react';
import { Layout } from 'antd';
import MenuAdmin from '../MenuAdmin/MenuAdmin';
import ComponentHeader from '../Header/Header';

const { Footer, Sider, Content } = Layout;

// const headerStyle: React.CSSProperties = {
//     textAlign: 'center',
//     color: '#fff',
//     height: 64,
//     lineHeight: '64px',
//     backgroundColor: '#4096ff',
// };

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
};

const logoStyle: React.CSSProperties = {
    height: 32,
    margin: 16,
    borderRadius: 6,
    background: 'rgba(255, 255, 255, 0.3)',
};

const siderStyle: React.CSSProperties = {
    lineHeight: '120px',
    color: '#fff',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

const layoutStyle = {
    overflow: 'hidden',
    minHeight: '100vh'
    // width: 'calc(50% - 8px)',
    // maxWidth: 'calc(50% - 8px)',
};

function MainLayout ({content }: {content?: React.ReactNode}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={layoutStyle}>
            <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={logoStyle}></div>
                <MenuAdmin />
            </Sider>
            <Layout>
                <ComponentHeader />
                <Content style={contentStyle}>
                    {content}
                </Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Layout>
    )
}


export default MainLayout;