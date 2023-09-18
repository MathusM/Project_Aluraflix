async function EditarVideoReg ({titulo, link, capa, categoria, texto, id}) {
    
    try {
    const resposta = await fetch (`https://64f87b1b824680fd217fa4d1.mockapi.io/videos/${id}`, {
        method : "PUT",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titulo: titulo,
            link: link,
            capa : capa,
            categoria : categoria,
            texto: texto
          })
    })

    if(resposta.ok){
        window.location.reload();
        console.log("Dados enviados com sucesso para API")
        
    }
    else {
        console.log("Erro ao enviar dados para API")
    }
    } catch(error) {
        console.error('Ocorreu um erro ao enviar os dados:', error)
    }
}

export default EditarVideoReg;