import styles from './Cabecalho.module.css'
import logo from '../../imagens/logo.png'
import Botao from 'components/Botao';
import { Link } from 'react-router-dom';

function Cabecalho({linkBotao, nomeBotao, renderizarBotão= true}) {
    return (
        <header>
            <nav className={styles.cabecalho}>
                <Link to="/">
                    <img src={logo} className={styles.logo} alt='Logo Aluraflix'></img>
                </Link>
                {renderizarBotão && (
                <Link to={linkBotao}>
                    <Botao corBorda='white' corLetra='white'>{nomeBotao}</Botao>
                </Link>
                )}
            </nav>

        </header>
    )
}

export default Cabecalho;