import { Container } from "@mui/material";
import styles from './NovoVideo.module.css'
import { Link } from "react-router-dom";
import Botao from "components/Botao";
import Campos from "components/Formulario/Campos";
import React, {  useEffect, useState } from "react";
import estiloMargin from 'Global';
import ListaSuspensa from "components/Formulario/ListaSuspensa";
import cadastrarVideo from "components/Cadastro/VideoRegs/CadastroVideo";
import Cabecalho from "components/Cabecalho";
import DataTableVideo from "components/Grids/GridVideos";



function NovoVideo({validacoes}) {
    const [erro, setErro] = useState({link : {valido : true, texto : ""}, capa : {valido: true, texto : ""}})
    const [erroCodigo, setErroCodigo] = useState ({codigo: {valido: true}})

    const [categorias, setCategorias] = useState([]);

    const [titulo, setTitulo] = useState('');
    const [link, setLink] = useState('');
    const [capa, setCapa] = useState('');
    const [categoria, setCategoria] = useState('');
    const [codigo, setCodigo] = useState('');
    const [texto, setTexto] = useState('');


    useEffect (() => {
      fetch('https://64f87b1b824680fd217fa4d1.mockapi.io/categoria')
       .then(resposta => resposta.json())
       .then(dados => {
        setCategorias(dados)
       })
    }, []);

    const categoriasExistentes = [...categorias]

    function LimparCampos () {
      setTitulo('')
      setCapa('')
      setLink('')
      setCodigo('')
      setTexto('')
      setCategoria('')
    }

    function ValidarCampos(event) {
        const {name, value} = event.target;
        const novoEstado = {...erro}
        novoEstado[name] = validacoes[name](value);
        setErro(novoEstado);
    }

    function ValidarCodigoDeSegurança (valor) {
      const CategoriaSelecionada = categorias.find(cat => cat.nome === categoria);

      if (CategoriaSelecionada.codigo === valor) {
        return true
      } else {
        alert("Codigo de Segurança esta incorreto!")
        return false
      }
  
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
    

    return (
      

      
      <section>
        <Cabecalho renderizarBotão={false}/>
          <Container component="article" maxWidth="lg" className={styles.container}>
            <h1 className={styles.titulo}>Novo Vídeo</h1>
              <form className={styles.form}
                onSubmit={(event) => {
                  event.preventDefault()

                  if (ValidarCodigoDeSegurança(codigo) === true && PossoEnviar()) {
                    setErroCodigo({codigo : {valido: true}})
                    cadastrarVideo(titulo, link, capa, categoria, texto)
                    return true

                  } else {
                    setErroCodigo({codigo: {valido : false}})
                    return false
                  }
                  

                 }
                }
                  
                
                >
                <Campos 
                      name="titulo"
                      valor={titulo} 
                      label="Titulo" 
                      type="text" 
                      margin="normal" 
                      full={true} 
                      obrigatorio={true}
                      CapturaValor={(event) => {
                        setTitulo(event.target.value)
                      }}


                  />

                  <Campos 
                      valor={link}
                      name="link"
                      label="Url do vídeo" 
                      type="text" 
                      margin="normal" 
                      full={true} 
                      obrigatorio={true}
                      CapturaValor={(event) => {
                        setLink(event.target.value)
                      }}
                      Desfoque={ValidarCampos}
                      Erro={!erro.link.valido}
                      TextoHelp={erro.link.texto}
                  />
                  
                  <Campos 
                      valor={capa} 
                      name="capa"
                      label="Url da capa" 
                      type="text" 
                      margin="normal" 
                      full={true} 
                      obrigatorio={true}
                      CapturaValor={(event) => {
                        setCapa(event.target.value)}}
                      Desfoque={ValidarCampos}
                      Erro={!erro.capa.valido}
                      TextoHelp={erro.capa.texto}
                  />

                  <ListaSuspensa
                    valor={categoria}
                    CapturaValor={(event) => {
                        setCategoria(event.target.value)}}
                  >
                    {categoriasExistentes.map(categoria => (
                      <option key={categoria.nome}>{categoria.nome}</option>
                    ))}
                  </ListaSuspensa>

                  <Campos 
                      valor={codigo} 
                      name="codigo"
                      label="Digite o Codigo de Segurança" 
                      type="number" 
                      margin="none" 
                      full={false} 
                      obrigatorio={true}
                      estiloMargin={estiloMargin}
                      CapturaValor={(event) => {
                        setCodigo(event.target.value)}}
                      Erro={!erroCodigo.codigo.valido}

                      
                      
                  />

                  <Campos 
                      valor={texto} 
                      name="texto"
                      label="Escreva uma mensagem!" 
                      type="text" 
                      margin="normal" 
                      full={true} 
                      obrigatorio={false}
                      multilinha={true}
                      linhas={6}
                      CapturaValor={(event) => {
                        setTexto(event.target.value)}}
                  />

                  

                  
                  
                  
                  
                  <section className={styles.botoes}>
                      <div className={styles.div1}>
                          <Botao corBotao="#2A7AE4" corLetra="white" corBorda="#2A7AE4" Margem="0 10px 0 0" type="submit">
                              Salvar
                          </Botao>
                      

                          <Botao corBotao="#9E9E9E" corBorda="#9E9E9E" className={styles.botao2} type='button' AoClicar={() => LimparCampos()}>
                              Limpar
                          </Botao>
                      </div>

                      <div className={styles.div2}>
                          <Link to="/NovaCategoria">
                              <Botao corBotao="#2A7AE4" corLetra="white" corBorda="#2A7AE4" className={styles.botao} Tamanho="10em">
                              Nova Categoria
                              </Botao>
                          </Link>
                      </div>
                      
                  </section>
              </form>
                  <p className={styles.informacao}>* Recomendamos que a imagem seja em 320x180</p>
                    <p className={styles.informacao}>* O Link do Video, deve vir da aba de compartilhamento, e em incorporação! <br/>
                      Caso não o faça sera impossivel reproduzir o Video no Player
                    </p>

                <h1 className={styles.titulo}>Lista de Videos</h1>
              <DataTableVideo tipo="videos" nome="Videos"/>



          </Container>
      </section>
    );
  }


export default NovoVideo;