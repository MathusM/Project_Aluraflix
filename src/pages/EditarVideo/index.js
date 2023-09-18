import { Container } from '@mui/material';
import Formulario from 'components/Formulario';
import Campos from 'components/Formulario/Campos';
import { useEffect, useState } from 'react';
import Botao from 'components/Botao';
import { useParams } from 'react-router-dom';
import styles from './EditarVideo.module.css'
import estiloMargin from 'Global';
import Cabecalho from 'components/Cabecalho';
import ListaSuspensa from 'components/Formulario/ListaSuspensa';
import EditarVideoReg from 'components/Cadastro/VideoRegs/EditarVideoReg';




function EditarVideo({validacoes}) {
    const [erro, setErro] = useState({link : {valido : true, texto : ""}, capa : {valido: true, texto : ""}})
    const [erroCodigo, setErroCodigo] = useState ({codigo: {valido: true}})
    const [videos, setVideos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const videosExistentes = [...videos]
    const categoriasExistentes = [...categorias]
    

    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [link, setLink] = useState('');
    const [capa, setCapa] = useState('');
    const [codigo, setCodigo] = useState('');
    const [texto, setTexto] = useState('');
    const {id}  = useParams();
    const [videoEditado, setVideoEditado] = useState(null);

    
    

    useEffect(() => {
        fetch ('https://64f87b1b824680fd217fa4d1.mockapi.io/videos')
         .then(resposta => resposta.json())
          .then(dados => {
            setVideos(dados)
          })
      }, []);



      useEffect (() => {
        fetch('https://64f87b1b824680fd217fa4d1.mockapi.io/categoria')
         .then(resposta => resposta.json())
         .then(dados => {
          setCategorias(dados)
         })
      }, []);



      useEffect(() => {
        const videoExistente = videos.find(video => video.id === id);
        if (videoExistente) {
            setVideoEditado(videoExistente);

            setTitulo(videoExistente.titulo);
            setCategoria(videoExistente.categoria);
            setLink(videoExistente.link);
            setCapa(videoExistente.capa);
            setCodigo(videoExistente.codigo);
            setTexto(videoExistente.texto);
        }
    }, [videos, id]);



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

  
      

    const IDVideo = videosExistentes.find((video => video.id === id))
    const NomeDoVideo = IDVideo ? IDVideo.titulo : ''




    



    return (
        
        
        <section>
            <Cabecalho renderizarBotão={true} linkBotao={'/NovoVideo'} nomeBotao={'Voltar'}/>


            <Container component="article" maxWidth="lg" className={styles.container}>
                <h1 className={styles.titulo}>Editar Video : <br></br>{NomeDoVideo}</h1>
                <form className={styles.form}
                    onSubmit={(event) => {
                        event.preventDefault();

                        if(ValidarCodigoDeSegurança(codigo) === true && PossoEnviar()){
                            setErroCodigo({codigo : {valido: true}})
                            EditarVideoReg({titulo, categoria, link, capa, codigo, id, texto})
                            return true
                        } else {
                            setErroCodigo({codigo: {valido : false}})
                            return false
                        }
                        
                        

                    }}
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
                            <Botao corBotao="#2A7AE4" corLetra="white" corBorda="#2A7AE4" className={styles.botao} type='submit'>
                                Editar
                            </Botao>
                        

                            <Botao corBotao="#9E9E9E" corBorda="#9E9E9E" type="button" className={styles.botao} AoClicar={() => LimparCampos()}>
                                Limpar
                            </Botao>
                    </section>

                    
                </form>
                <h3 className={styles.informacao}>**Recomendamos que a imagem seja em 320x180</h3>
                <h3 className={styles.informacao}>**O Link do Video, deve vir da aba de compartilhamento, e em incorporação! <br/>
                Caso não o faça sera impossivel reproduzir o Video no Player
                </h3>
            </Container>
        </section>
    )
}

export default EditarVideo;