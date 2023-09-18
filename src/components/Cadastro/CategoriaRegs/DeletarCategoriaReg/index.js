export default async function DeletarCategoriaReg ({id}) {
    try{


        const respostaCategoria = await fetch (`https://64f87b1b824680fd217fa4d1.mockapi.io/categoria/${id}`)
        const categoria = await respostaCategoria.json();

        if (!categoria) {
            console.log("Categoria não encrontrada!")
            return
        }
        
        const respostaVideos = await fetch('https://64f87b1b824680fd217fa4d1.mockapi.io/videos');
        const videos = await respostaVideos.json();
        

        const respostaExcluirCategoria = await fetch(`https://64f87b1b824680fd217fa4d1.mockapi.io/categoria/${id}`, {
        method: 'DELETE',
        });

            if(respostaExcluirCategoria.ok) {
                    console.log('Categoria excluída com sucesso!');

                    let videosEncontrados = false;

                        for(const video of videos) {
                            if(video.categoria === categoria.nome) {
                                const idVideo = video.id
                                const respostaExcluirVideo = await fetch(`https://64f87b1b824680fd217fa4d1.mockapi.io/videos/${idVideo}`, {
                        method: 'DELETE',
                    });

                    if(respostaExcluirVideo.ok) {
                        console.log("Ok")
                    
                    } else {
                        console.log(`Erro ao excluir o vídeo "${video.nome}".`);

                      }

                      videosEncontrados = true;
                    }
                  }
                  if (!videosEncontrados) {
                    alert('Nenhum vídeo foi encontrado relacionado a esta categoria!');
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                }
            
                  // Recarregar a página após a exclusão

            } else {
                console.log('Houve um erro ao excluir a categoria.');
            }


            if (respostaExcluirCategoria.ok) {

            }
        } catch (error) {
        console.error('Houve o seguinte erro:', error);
    }
}