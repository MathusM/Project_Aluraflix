
import styles from './Formulario.module.css'









function Formulario ({children, submit}) {

    
    return (
        <form className={styles.container}  onSubmit={submit}>
            {children}
        </form>

    )
}

export default Formulario;