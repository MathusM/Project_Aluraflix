import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeletarCategoriaReg from 'components/Cadastro/CategoriaRegs/DeletarCategoriaReg';






export default function DataTableVideo({tipo, nome}) {
  const [dados, setDados] = useState([]);
  const navigate = useNavigate();
  const url = "https://64f87b1b824680fd217fa4d1.mockapi.io/"

  const categorias = [...dados]

  useEffect(() => {
    fetch (`${url}${tipo}`)
     .then(resposta => resposta.json())
      .then(dados => {
        setDados(dados)
      })
  }, [])

  function EditarCategoria (params) {
    if (!params.row.id) return
    navigate (`/EditarCategoria/${params.row.id}`)
  }

  function DeletarCategoria (params) {
    
      if (!params.row.id) return
      
      const id = params.row.id
      const promptCD = prompt("Por favor insira o codigo de segurança")
      const codigoCategoria = categorias.find(cat => cat.id === id)

      if(promptCD === codigoCategoria.codigo) {
        DeletarCategoriaReg({id})
      } else {
        alert("Codigo de Segurança incorreto!")
      }
      


}

  
  const columns = [
    {field: "id", headerName: "ID", width: 70},
    {field: "nome", headerName: `${nome}`, width: 250},
    {field: "descricao", headerName: "Descricão", width: 550},
    {field: "quantidade", headerName: "Q.de Videos", width: 100},
    {field: 'actions',
    headerName: 'Ações',
    minWidth: 150,
    renderCell: (params) => (
      <Stack direction="row" spacing={2}>
          <IconButton color='info' size='small' onClick={() => EditarCategoria(params)}>
              <EditIcon fontSize='inherit'/>
          </IconButton>
          <IconButton color='error' size="small" onClick={() => DeletarCategoria(params)}>
              <GridDeleteIcon></GridDeleteIcon>
          </IconButton>
      </Stack>
    )
    }
  ];

  const rows = dados.map((row) => ({
    id: row.id,
    nome: row.nome,
    descricao: row.descricao
  }))

  


  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}