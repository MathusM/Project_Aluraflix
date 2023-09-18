import styles from './Botao.module.css'

function Botao ({children, corBotao, corLetra, corBorda, type, AoClicar, Margem, Tamanho}) {
    return (
        <>
        <button type={type} className={styles.botao} onClick={AoClicar} style={{backgroundColor: corBotao, color: corLetra, borderColor: corBorda, margin: Margem, width: Tamanho}}>
            {children}
        </button>
        </>
    )
}

export default Botao;