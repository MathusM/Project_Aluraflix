import { Container } from '@mui/material';
import Formulario from 'components/Formulario';
import Campos from 'components/Formulario/Campos';
import { useEffect, useState } from 'react';
import Botao from 'components/Botao';
import { useParams } from 'react-router-dom';
import styles from './EditarCategoria.module.css'
import EditCategoriaReg from 'components/Cadastro/CategoriaRegs/EditCategoriaReg';
import Cabecalho from 'components/Cabecalho';




function EditarCategoria({validacoes}) {
    const [erro, setErro] = useState({ nome : {valido: true, texto : ""}})
    const [erroCodigo, setErroCodigo] = useState({codigo : {valido: true, texto : ""}})
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cor, setCor] = useState('');
    const [codigo, setCodigo] = useState('');
    const [categoriaEditada, setCategoriaEditada] = useState(null)
    const {id}  = useParams();

    const [categorias, setCategorias] = useState([])


    

    useEffect(() => {
        fetch ('https://64f87b1b824680fd217fa4d1.mockapi.io/categoria')
         .then(resposta => resposta.json())
          .then(dados => {
            setCategorias(dados)
          })
      }, [])




    useEffect(() => {
        const CategoriaExistente = categorias.find(cat => cat.id === id)
         if (CategoriaExistente) {
            setCategoriaEditada(CategoriaExistente);
            
            setNome(CategoriaExistente.nome)
            setDescricao(CategoriaExistente.descricao)
            setCor(CategoriaExistente.cor)

         }
    }, [categorias, id]);




    const categoriaSelecionada = categorias.find(categoria => categoria.id === id)
    const nomeCategoria = categoriaSelecionada ? categoriaSelecionada.nome : ''





    function ValidarCampos (event) {
        
        const {name, value} = event.target; 
        const novoEstado = {...erro}
        novoEstado[name] = validacoes[name](value);
        setErro(novoEstado);

    }




    function PossoEnviar () {
        for (let campo in erro) {
            if(!erro[campo].valido)
            {
            return false
            }
        }
        
        return true;
    }





    function ValidacaoCodigo (codigo, id) {
        const CategoriaSelecionada = categorias.find(cat => cat.codigo === codigo);
        console.log(CategoriaSelecionada)
        if(codigo.length >= 5){
            return false
        }
        else if (CategoriaSelecionada) {
            if(categoriaSelecionada.id === id) {
                return true
            } else {
                return false
            }
        }
        
    } 



    return (
        
        
        <section>
            <Cabecalho linkBotao={'/NovaCategoria'} nomeBotao={'Voltar'}/>


            <Container component="article" maxWidth="lg" className={styles.container}>
                <h1 className={styles.titulo}>Editar Categoria {nomeCategoria}</h1>
                <Formulario 
                    submit={(event) => {
                        event.preventDefault();
                        if(ValidacaoCodigo(codigo, id) === true && PossoEnviar()){
                            setErroCodigo ({codigo: {valido: true, texto: ""}})
                            EditCategoriaReg({nome, descricao, cor, codigo, id})
                        } else {
                            setErroCodigo ({codigo: {valido: false, texto: "O codigo esta incorreto, ou passa de 4 digitos!"}})
                        }

                    }}
                >
                    <Campos 
                        valor={nome} 
                        name="nome"
                        label="Nome" 
                        type="text" 
                        margin="normal" 
                        full={true} 
                        obrigatorio={true}
                        CapturaValor={(event) => {
                            setNome(event.target.value)
                        }}
                        Desfoque={ValidarCampos}
                        Erro={!erro.nome.valido}
                        TextoHelp={erro.nome.texto}
                    />

                    <Campos 
                        valor={descricao} 
                        label="Descrição" 
                        type="text" 
                        margin="normal" 
                        full={true} 
                        obrigatorio={true}
                        multilinha={true}
                        linhas={3}
                        CapturaValor={(event) => {
                            setDescricao(event.target.value)
                        }}
                    />


                    <Campos 
                        
                        valor={cor} 
                        label="Cor do time" 
                        type="color" 
                        margin="normal" 
                        full={true} 
                        SX={{padding : '10px'}}
                        obrigatorio={true}
                        CapturaValor={(event) => {
                            setCor(event.target.value)
                        }}
                        
                    />

                    <Campos 
                        valor={codigo} 
                        label="Codigo de Segurança" 
                        type="number" 
                        margin="normal" 
                        full={true} 
                        obrigatorio={true}
                        CapturaValor={(event) => {
                            setCodigo(event.target.value)
                        }}
                        Erro={!erroCodigo.codigo.valido}
                        TextoHelp={erroCodigo.codigo.texto}
                    />

                    <section className={styles.botoes}>
                            <Botao corBotao="#2A7AE4" corLetra="white" corBorda="#2A7AE4" className={styles.botao} type='submit'>
                                Editar
                            </Botao>
                        

                            <Botao corBotao="#9E9E9E" corBorda="#9E9E9E" className={styles.botao}>
                                Limpar
                            </Botao>
                    </section>

                    
                </Formulario>
            </Container>
        </section>
    )
}

export default EditarCategoria;