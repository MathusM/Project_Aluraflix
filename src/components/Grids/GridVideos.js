import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeletarVideoReg from 'components/Cadastro/VideoRegs/DeletarVideoReg';






export default function DataTable({tipo, nome}) {
  const [dados, setDados] = useState([]);
  const navigate = useNavigate();
  const url = "https://64f87b1b824680fd217fa4d1.mockapi.io/"

  useEffect(() => {
    fetch (`${url}${tipo}`)
     .then(resposta => resposta.json())
      .then(dados => {
        setDados(dados)
      })
  }, [])

  function EditarVideo (params) {
    if (!params.row.id) return
    navigate (`/EditarVideo/${params.row.id}`)
  }

  function DeletarVideo (params) {
    if (!params.row.id) return
    const id = params.row.id
    DeletarVideoReg({id})

  }

  
  const columns = [
    {field: "id", headerName: "ID", width: 70},
    {field: "titulo", headerName: `${nome}`, width: 550},
    {field: "categoria", headerName: "Categoria", width: 250},
    {field: 'actions',
    headerName: 'Ações',
    minWidth: 150,
    renderCell: (params) => (
      <Stack direction="row" spacing={2}>
          <IconButton color='info' size='small' onClick={() => EditarVideo(params)}>
              <EditIcon fontSize='inherit'/>
          </IconButton>
          <IconButton color='error' size="small" onClick={() => DeletarVideo(params)}>
              <GridDeleteIcon></GridDeleteIcon>
          </IconButton>
      </Stack>
    )
    }
  ];

  const rows = dados.map((row) => ({
    id: row.id,
    titulo: row.titulo,
    categoria: row.categoria
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