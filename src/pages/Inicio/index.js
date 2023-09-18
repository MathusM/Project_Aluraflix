import Banner from "components/Banner";
import Carrosel from "components/Carrossel";
import styles from './Inicio.module.css'
import useAPIBusca from "hooks/APIBusca";
import Cabecalho from "components/Cabecalho";



function Inicio() {
  const categorias = useAPIBusca('https://64f87b1b824680fd217fa4d1.mockapi.io/categoria')
  const videos = useAPIBusca('https://64f87b1b824680fd217fa4d1.mockapi.io/videos')

  const CategoriasExistentes = [...categorias]

  return (
    <section className={styles.container}>
      <Cabecalho linkBotao={'/NovoVideo'} nomeBotao={'Novo Vídeo'}/>
        <Banner categoria={CategoriasExistentes}/>
        {CategoriasExistentes.map(categoria => (
      <Carrosel key={categoria.nome}  videos={videos.filter(video => video.categoria === categoria.nome)} corDada={categoria.cor} categoria={categoria.nome} />
    ))}
    </section>
  );
}

export default Inicio;
