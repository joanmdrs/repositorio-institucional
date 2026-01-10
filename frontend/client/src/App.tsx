import { ConfigProvider } from 'antd';
import AppRoutes from './routes';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Lexend, sans-serif',
        },
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
