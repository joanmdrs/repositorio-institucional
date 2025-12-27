import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import AutorPage from "./pages/Autor";
import AutorForm from "./pages/Autor/AutorForm";


function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/autores" element={<AutorPage />} />
                    <Route path="/novo-autor" element={<AutorForm />} />
                    <Route path="/editar-autor/:id" element={<AutorForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;