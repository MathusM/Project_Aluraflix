import Cabecalho from "components/Cabecalho";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Player.module.css'

function Player () {
    const [data, setData] = useState([]);
    const {id} = useParams()





    
    useEffect(() => {
        fetch ('https://64f87b1b824680fd217fa4d1.mockapi.io/videos')
         .then(resposta => resposta.json())
          .then(dados => {
            setData(dados)
          })
      }, []);



    
    const VideoBuscado = [...data]
    const VideoDados = VideoBuscado.find((video => video.id === id))
    
    const NomeDoVideo = VideoDados ? VideoDados.titulo : ''
    const LinkVideo = VideoDados ? VideoDados.link : ''
    const Descricao = VideoDados ? VideoDados.texto : ''
    





    return (
        <main>
            <Cabecalho linkBotao="/" nomeBotao="Voltar" />
                <div className={styles.container}>
                    <h3>Assista ao Vídeo:</h3>
                        <h1>{NomeDoVideo}</h1>
                                <iframe 
                                width="949" 
                                height="534" 
                                src={LinkVideo}
                                title={NomeDoVideo}
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen>

                                </iframe>
                    <h4>Descrição:</h4>
                <p>{Descricao}</p>
            </div>
        </main>
    )
}

export default Player;