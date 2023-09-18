import styles from './Rodape.module.css'
import logo from '../../imagens/logo.png'
import { Copyright } from '@mui/icons-material';



function Rodape () {
    return (
        <footer className={styles.container}>      
            <img src={logo} alt='Logo no Rodape'/>
            
            <div className={styles.texto}>
                <Copyright />
                <h3>Desenvolvido por Matheus</h3>
            </div>

            
        </footer>
    )
}

export default Rodape;