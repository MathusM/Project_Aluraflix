import styles from './NomeCategoria.module.css'

function NomeCategoria ({nome, cor, texto, tamanhoTexto}){
    
    return (
        <section className={styles.container}>
            <div className={styles.botao} style={{backgroundColor: cor, fontSize: tamanhoTexto}}>
                <h1 style={{fontSize: tamanhoTexto}}>{nome}</h1>
            </div>
            <div className={styles.categoriaTexto}>
                <h1>{texto}</h1>
            </div>
        </section>
    )
}

export default NomeCategoria