import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth.hook";
import { Button, Form, Input, message } from "antd";
import type { LoginRequest } from "../../auth/auth.types";
import HeaderLogin from "./HeaderLogin";
import CustomFooter from "../../components/Footer/Footer";

const loginPageStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
};


const formLoginStyle: React.CSSProperties = {
    flex: 1,                 // 👈 ocupa o espaço entre header e footer
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};


export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleSubmit(values: LoginRequest) {

        setLoading(true);

        try {
            await login(values['username'], values['password']);

        // depois você pode trocar isso por:
        // - /select-group
        // - /dashboard
            message.success('Login realizado com sucesso!')
            console.log(values)
            navigate("/");

        } catch (err: any) {
            console.log("Erro ao tentar realizar login", err)
            message.error('Falha no login, tente novamente!')
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={loginPageStyle}>
            <HeaderLogin />
            <div style={formLoginStyle}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Por favor, informe seu usuário!' }]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Por favor, informe sua senha!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <CustomFooter />
            
        </div>
  );
}
