    



    function ValidarNome (nome) {

        if(nome.length < 3) {

            return {valido: false, texto : "O nome/titulo esta muito pequeno!"}
        } else {
            return { valido : true,  texto : ""}
        }
    }

    function ValidarDescricao (descricao) {
        if(descricao.lenght < 8) {

            return {valido: false, texto : "A Descrição esta muito pequena!"}
        } else {
            return { valido : true,  texto : ""}
        }
    }

    function ValidarLinkVideo (valor) {

            const url = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        
            if (!valor.match(url)) {
              return {valido : false, texto: "Insira um link valido!"}
            } else {
                return {valido: true, texto: ""}
            }
        

          };

    function ValidarLinkCapa (valor) {
            const url = /(https?:\/\/.*\.(?:png|jpg))/i

            if (!valor.match(url)) {
                return {valido : false, texto : "Insira um link de imagem valido"}
            } else {
                return {valido : true, texto : ""}
            }
    }

    
    

export {ValidarNome, ValidarDescricao, ValidarLinkVideo, ValidarLinkCapa};