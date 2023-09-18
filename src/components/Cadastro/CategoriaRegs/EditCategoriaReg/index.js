

export default async function EditCategoriaReg ({nome, descricao, cor, codigo, id}) {
    try {
    const resposta = await fetch (`https://64f87b1b824680fd217fa4d1.mockapi.io/categoria/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nome,
            descricao: descricao,
            cor: cor,
            codigo: codigo
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