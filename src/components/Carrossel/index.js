import {motion} from 'framer-motion'
import styles from './Carrosel.module.css'
import NomeCategoria from 'components/NomeCategoria';
import VideoCard from 'components/VideoCard';
import { useEffect, useRef, useState } from 'react';

function Carrosel ({videos, corDada}) {
    const carrocel = useRef();
    const [width, setWidth] = useState();

    const categoriasExistentes = [...new Set(videos.map(video => video.categoria))];

    const botoesCategoria = categoriasExistentes.map((categoria, index) => (
        <NomeCategoria key={index} nome={categoria} texto={categoria.texto} cor={corDada}>
        </NomeCategoria>
      ));


    useEffect(() => {
        const f =(carrocel.current?.scrollWidth, carrocel.current?.offsetWidth)
        setWidth(carrocel.current?.scrollWidth - carrocel.current?.offsetWidth)
    })



    return (
        <div className={styles.container}>

            <div className={styles.texto}>
                {botoesCategoria}

            </div>
                <motion.div ref={carrocel} className={styles.carrocel} whileTap={{cursor: "grabbing"}} >
                    <motion.div className={styles.inner}  drag="x" dragConstraints={{right: 0 , left: -width}} initial={{x: 200}} animate={{x: 0}} transition={{duration: 2}}>
                        {videos.map((video) => {
                            const larguraDaTela = window.innerWidth;

                            // Definir o tamanho com base na largura da tela
                            let tamanhoDoVideoCard = '600px'; // Tamanho padrão
                          
                            if (larguraDaTela < 500) {
                              tamanhoDoVideoCard = '200px';
                            } else {
                              tamanhoDoVideoCard = '600px'
                            }
                                return <VideoCard capa={video.capa} id={video.id} titulo={video.titulo} key={video.id} corBorda={corDada} Tamanho={tamanhoDoVideoCard}/>
                            })}
                    </motion.div>
                </motion.div>
        </div>
    )
}

export default Carrosel;