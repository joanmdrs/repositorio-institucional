import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import AutorForm from "./pages/Autor/AutorForm";
import AutorPage from "./pages/Autor/AutorPage";
import OrientadorPage from "./pages/Orientador/OrientadorPage";
import OrientadorForm from "./pages/Orientador/OrientadorForm";


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
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;