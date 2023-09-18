import { TextField } from "@mui/material"
import styles from './Campos.module.css'

function Campos ({children,SX, Desfoque,name, Erro,TextoHelp, obrigatorio = false, label,full = true, margin, type,valor, seletor = false, estiloMargin, multilinha = false, linhas, CapturaValor}) {
    
    return (
        <>
            <TextField
                required={obrigatorio}
                value={valor}
                name={name}
                id={valor}
                sx={SX}
                label={label}
                type={type}
                variant='filled'
                className={styles.campo}
                margin={margin}
                color='secondary'
                fullWidth={full}
                select={seletor}
                style={estiloMargin}
                multiline={multilinha}
                rows={linhas}
                onChange={CapturaValor}
                onBlur={Desfoque}
                error={Erro}
                helperText={TextoHelp}
                
            >
                {children}
            </TextField>
        </>
    )
}

export default Campos;