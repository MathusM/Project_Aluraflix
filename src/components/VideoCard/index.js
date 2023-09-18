import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css'

function VideoCard ({capa, titulo, corBorda, Tamanho, id}) {
    return (
        <motion.div className={styles.container}>
            <Link to={`Player/${id}`}>
                <img src={capa} alt={`Capa do vídeo : ${titulo}`} className='' style={{borderColor: corBorda, width: Tamanho}}/>
            </Link>
        </motion.div>

    )
}

export default VideoCard;