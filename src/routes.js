import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import NovoVideo from "pages/NovoVideo";
import PaginaBase from "pages/PaginaBase";
import NovaCategoria from "pages/NovaCategoria";
import {ValidarLinkVideo, ValidarLinkCapa, ValidarNome} from "components/models/Validacao";
import EditarCategoria from "pages/EditarCategoria";
import EditarVideo from "pages/EditarVideo";
import Player from "pages/Player";

function AppRoutes () {

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaBase />}>
                <Route index element={<Inicio />} />
                <Route path="NovoVideo" element={<NovoVideo validacoes={{link: ValidarLinkVideo, capa: ValidarLinkCapa}}/>} />
                <Route path="NovaCategoria" element={<NovaCategoria validacoes={{nome: ValidarNome}}/>} />
                <Route path="EditarCategoria/:id" element={<EditarCategoria validacoes={{nome: ValidarNome}}/>} />
                <Route path="EditarVideo/:id" element={<EditarVideo validacoes={{link: ValidarLinkVideo, capa: ValidarLinkCapa}}/>} />
                <Route path="Player/:id" element={<Player />} />
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes;