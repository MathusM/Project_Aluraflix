export default async function DeletarVideoReg ({id}) {
    try{
        const respostaVideo = await fetch (`https://64f87b1b824680fd217fa4d1.mockapi.io/videos/${id}`, {
            method: "DELETE"
        })
        
        if(respostaVideo.ok) {
            window.location.reload();
            console.log("Video Deletado!")
        } else {
            console.log("Erro ao excluir video!")
        } 

    } catch(error) {
        console.error("O seguinte erro aconteceu :", error)
    }
}