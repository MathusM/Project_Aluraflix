

async function cadastrarVideo (titulo, link, capa, categoria, texto) {
  try {
  const resposta = await fetch("https://64f87b1b824680fd217fa4d1.mockapi.io/videos", {
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
            body: JSON.stringify({
              titulo: titulo,
              capa: capa,
              categoria: categoria,
              texto: texto,
              link: link
                
          })
        });
        if(resposta.ok){
          console.log("Sucesso ao enviar dados a API!")
          window.location.reload();
        } else {
          console.log("Erro ao enviar dados a API!")
        }
      } catch(error) {
        console.error("O seguinte erro aconteceu ao enviar dados :", error)
      }
}

export default cadastrarVideo;

  