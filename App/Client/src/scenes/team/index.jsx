import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import Header from "../../components/Header";
import { useGetUsersQuery } from "../../state/API";

const Team = () => {
  const { data, isLoading } = useGetUsersQuery();
 
   

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
      { field: "_id", headerName: "ID" ,  flex: 1 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { name, surname } }) => {
            return (name + " " + surname);
        }
      },
      {
          field: "occupation",
          headerName: "Ocupação",
          flex: 1,
      },
    {
      field: "phoneNumber",
      headerName: "Telefone",
      flex: 0.7,
     },
    {
      field: "email",
      headerName: "Email",
        flex: 1,
    },
    {
      field: "role",
      headerName: "Nível de Acesso",
      flex: 1.3,
        renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="70%"
            m="10px 0"
            p="5px"
            display="flex"
            justifyContent="center"
                backgroundColor={
                role === "Super Administrador" ?
                colors.redAccent[500]
                : role === "Administrador" 
                ? colors.redAccent[600]
                : role === "Gestor"
                ? colors.greenAccent[600]
                : colors.blueAccent[600]
            }
            borderRadius="4px"
            >
            {role === "Super Administrador" && <LockOpenOutlinedIcon />}
            {role === "Administrador" && <SecurityOutlinedIcon />}
            {role === "Gestor" && <SupervisorAccountIcon />}
            {role === "Usuário" && <PersonIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TIME" subtitle="Gerencie sua equipe." />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
              <DataGrid checkboxSelection loading={isLoading || !data} getRowId={(row) => row._id} rows={data || {}} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
