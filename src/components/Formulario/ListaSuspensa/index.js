import styles from './ListaSuspensa.module.css'

function ListaSuspensa ({valor, children, CapturaValor}) {

return (
    
        <select id={valor} name='categoria' value={valor} placeholder='texto' className={styles.input} onChange={CapturaValor}>
            <option />
                {children}
        </select>
)
}

export default ListaSuspensa;
