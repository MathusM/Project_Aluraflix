import NomeCategoria from 'components/NomeCategoria';
import styles from './Banner.module.css'

function Banner ({categoria}) {
    const CategoriaNome = categoria.filter((categoria) => {
        return categoria.nome === "Front-End"
    })

    const nome = CategoriaNome.map((element) => element.nome);

    return (
        <section className={styles.container}>
        <div className={styles.texto}>
            <NomeCategoria nome={nome} tamanhoTexto="42px"/>
            <h1>Seo com React</h1>
            <p>Esse desafio é uma forma de aprendizado.
                 É um mecanismo onde você pode se engajar na resolução de um problema para poder aplicar todo o conhecimento adquirido
                  na Formação React.
            </p>
        </div>

        <div>
        <iframe
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/Z-N5Fr9P-GU?si=hfGRv1DbvuXRS_aN" 
        title="YouTube video player" 
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
        />
        
        </div>
        </section>

    )
}

export default Banner;