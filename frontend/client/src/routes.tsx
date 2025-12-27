import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import AutorForm from "./pages/Autor/AutorForm";
import AutorPage from "./pages/Autor/AutorPage";
import OrientadorPage from "./pages/Orientador/OrientadorPage";
import OrientadorForm from "./pages/Orientador/OrientadorForm";
import DepartamentoPage from "./pages/Departamento/DepartamentoPage";
import DepartamentoForm from "./pages/Departamento/DepartamentoForm";
import CursoPage from "./pages/Curso/CursoPage";
import CursoForm from "./pages/Curso/CursoForm";
import PalavraChavePage from "./pages/PalavraChave/PalavraChavePage";
import PalavraChaveForm from "./pages/PalavraChave/PalavraChaveForm";


function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/autores" element={<AutorPage />} />
                    <Route path="/novo-autor" element={<AutorForm />} />
                    <Route path="/editar-autor/:id" element={<AutorForm />} />

                    <Route path="/orientadores" element={<OrientadorPage />} />
                    <Route path="/novo-orientador" element={<OrientadorForm />} />
                    <Route path="/editar-orientador/:id" element={<OrientadorForm />} />

                    <Route path="/departamentos" element={<DepartamentoPage /> } />
                    <Route path="/novo-departamento" element={<DepartamentoForm />} />
                    <Route path="/editar-departamento/:id" element={<DepartamentoForm />} />

                    <Route path="/cursos" element={<CursoPage />} />
                    <Route path="/novo-curso" element={<CursoForm />} />
                    <Route path="/editar-curso/:id" element={<CursoForm />} />

                    <Route path="/palavras-chave" element={<PalavraChavePage />} />
                    <Route path="/nova-palavra-chave" element={<PalavraChaveForm />} />
                    <Route path="/editar-palavra-chave/:id" element={<PalavraChaveForm />} />

    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;