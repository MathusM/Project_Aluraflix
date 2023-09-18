import { Container } from '@mui/material';
import styles from './NovaCategoria.module.css'
import Formulario from 'components/Formulario';
import Campos from 'components/Formulario/Campos';
import { useState } from 'react';
import Botao from 'components/Botao';
import cadastrarCategoria from 'components/Cadastro/CategoriaRegs/CadastroCategoriaReg';
import DataTable from 'components/Grids/GridCategoria';
import Cabecalho from 'components/Cabecalho';
import useAPIBusca from 'hooks/APIBusca';

function NovaCategoria({validacoes}) {


    const [erro, setErro] = useState({ nome : {valido: true, texto : ""}})
    const [erroCodigo, setErroCodigo] = useState({codigo : {valido: true, texto : ""}})
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cor, setCor] = useState('');
    const [codigo, setCodigo] = useState('');

    
    const categorias = useAPIBusca("https://64f87b1b824680fd217fa4d1.mockapi.io/categoria")
    


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



    function ValidacaoCodigo (codigo) {
        const CategoriaSelecionada = categorias.find(cat => cat.codigo === codigo);
        if(codigo.length >= 5){
            return false
        }
        else if (CategoriaSelecionada) {
            alert("Já existe uma categoria com o mesmo código! Tente outro.");
            return false
        } else {
            console.log("Não é igual, e não e igual ou maior que 5");
            return true
        }
    } 

    
    

    return (
        
        <section>
            <Cabecalho linkBotao={'/NovoVideo'} nomeBotao={'Voltar'} />
                <Container component="article" maxWidth="lg" className={styles.container}>
                    <h1 className={styles.titulos}>Nova Categoria</h1>
                    <Formulario 
                        submit={(event) => {
                            event.preventDefault();

                            if(ValidacaoCodigo(codigo) === true && PossoEnviar()){
                                setErroCodigo ({codigo: {valido: true, texto: ""}})
                                cadastrarCategoria(nome,descricao, cor, codigo)
                            } else {
                                setErroCodigo ({codigo: {valido: false, texto: "O codigo já existe, ou passa de 4 digitos!"}})
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
                            name="descricao"
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
                            name="cor"
                            label="Cor do time" 
                            type="color" 
                            margin="normal" 
                            full={true} 
                            obrigatorio={true}
                            SX={{padding : '10px'}}
                            CapturaValor={(event) => {
                                setCor(event.target.value)
                            }}
                            
                        />

                        <Campos 
                            valor={codigo}
                            name="codigo"
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
                                    Salvar
                                </Botao>
                            

                                <Botao corBotao="#9E9E9E" corBorda="#9E9E9E" className={styles.botao}>
                                    Limpar
                                </Botao>
                        </section>

                        
                    </Formulario>
                    <h1 className={styles.titulos}>Lista de Categorias</h1>
                <DataTable tipo="categoria" nome="Categorias"/>
                </Container>
        </section>
    )
}

export default NovaCategoria;