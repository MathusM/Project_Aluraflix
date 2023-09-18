async function cadastrarCategoria (nome,descricao, cor, codigo) {
    try {
    const resposta =  await fetch('https://64f87b1b824680fd217fa4d1.mockapi.io/categoria', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            descricao: descricao,
            cor: cor,
            codigo: codigo
        })
    })
    

    if (resposta.ok) {
        // Os dados foram enviados com sucesso
        // Recarregue a página
        window.location.reload();
      } else {
        // Trate erros de envio, se necessário
        console.error('Erro ao enviar os dados para a API.');
      }
    } catch (error) {
      // Trate erros de rede ou outros erros
      console.error('Ocorreu um erro ao enviar os dados:', error);
    }
  }





export default cadastrarCategoria;