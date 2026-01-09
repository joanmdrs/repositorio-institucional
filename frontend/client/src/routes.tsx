import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import DepartamentoPage from "./pages/Departamento/DepartamentoPage";
import DepartamentoForm from "./pages/Departamento/DepartamentoForm";
import CursoPage from "./pages/Curso/CursoPage";
import CursoForm from "./pages/Curso/CursoForm";
import PalavraChavePage from "./pages/PalavraChave/PalavraChavePage";
import PalavraChaveForm from "./pages/PalavraChave/PalavraChaveForm";
import TrabalhoPage from "./pages/Trabalho/TrabalhoPage";
import TrabalhoForm from "./pages/Trabalho/TrabalhoForm";
import ArquivoPage from "./pages/Arquivo/ArquivoPage";
import ArquivoForm from "./pages/Arquivo/ArquivoForm";
import PessoaPage from "./pages/Pessoa/PessoaPage";
import PessoaForm from "./pages/Pessoa/PessoaForm";
import ParticipacaoTrabalhoPage from "./pages/ParticipacaoTrabalho/ParticipacaoTrabalhoPage";
import ParticipacaoTrabalhoForm from "./pages/ParticipacaoTrabalho/ParticipacaoTrabalhoForm";
import UsuarioPage from "./pages/Usuario/UsuarioPage";
import UsuarioForm from "./pages/Usuario/UsuarioForm";


function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/pessoas" element={<PessoaPage />} />
                    <Route path="/nova-pessoa" element={<PessoaForm />} />
                    <Route path="/editar-pessoa/:id" element={<PessoaForm />} />

                    <Route path="/departamentos" element={<DepartamentoPage /> } />
                    <Route path="/novo-departamento" element={<DepartamentoForm />} />
                    <Route path="/editar-departamento/:id" element={<DepartamentoForm />} />

                    <Route path="/cursos" element={<CursoPage />} />
                    <Route path="/novo-curso" element={<CursoForm />} />
                    <Route path="/editar-curso/:id" element={<CursoForm />} />

                    <Route path="/palavras-chave" element={<PalavraChavePage />} />
                    <Route path="/nova-palavra-chave" element={<PalavraChaveForm />} />
                    <Route path="/editar-palavra-chave/:id" element={<PalavraChaveForm />} />

                    <Route path="/trabalhos" element={<TrabalhoPage /> } />
                    <Route path="/novo-trabalho" element={<TrabalhoForm />} />
                    <Route path="/editar-trabalho/:id" element={<TrabalhoForm />} />

                    <Route path="/participacoes-trabalho" element={<ParticipacaoTrabalhoPage />} />
                    <Route path="/nova-participacao" element={<ParticipacaoTrabalhoForm />} />
                    <Route path="/editar-participacao/:id" element={<ParticipacaoTrabalhoForm />} />

                    <Route path="/usuarios" element={<UsuarioPage />} />
                    <Route path="/novo-usuario" element={<UsuarioForm />} />
                    <Route path="/editar-usuario/:id" element={<UsuarioForm />} />

                    <Route path="/arquivos" element={<ArquivoPage />} />
                    <Route path="/novo-arquivo" element={<ArquivoForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;