import { useState, useEffect } from 'react';

// Crie um hook personalizado para buscar dados de uma API
function useAPIBusca(apiEndpoint) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(resposta => resposta.json())
      .then(dados => {
        setData(dados);
      });
  }, [apiEndpoint]);

  return data;
}

export default useAPIBusca;