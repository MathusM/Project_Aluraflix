
import Container from "components/Container";
import Rodape from "components/Rodape";
import { Outlet } from "react-router-dom";
import 'typeface-inter'
import 'fontsource-roboto'

function PaginaBase () {
    return (
        <main>
                <Container>
                    <Outlet />
                </Container>
            <Rodape />
        </main>
    )
}

export default PaginaBase;