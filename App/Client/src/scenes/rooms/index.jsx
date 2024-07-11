import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { styled } from '@mui/system';
import { useGetRoomsQuery, useGetUsersQuery } from "../../state/API";
import CircularProgress from '@mui/material/CircularProgress';

const Rooms = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data:users, isLoading } = useGetUsersQuery();
    const { data, isLoading:isLoading2 } = useGetRoomsQuery();

    if (isLoading || isLoading2) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    const ScrollableCell = styled('div')({
        maxHeight: 55,
        lineHeight: '2',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        textOrientation: 'mixed',
    });

  const columns = [
      { field: "_id", headerName: "ID Sala", flex: 1},
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "deviceID",
        headerName: "ID Dispositivo",
    },
    {
      field: "manager",
      headerName: "Gestor",
      flex: 1,
      cellClassName: "manager-column--cell",
        renderCell: ({ row: { manager } }) => {
            manager = manager[0];
            if (!isLoading2) {
                var manag = users.find(p => { return p._id === manager; });
                return manag.name + ' ' + manag.surname;
            }
            return 'Loading';     
        }
    },
    {
      field: "access",
      headerName: "Usuários",
      flex: 2.5,
        renderCell: ({ row: { access } }) => {
            var text = '';
            for (let i = 0; i < access.length - 1; i++) {
                var u = users.find(p => { return p._id === access[i]; });
                text += u.name + ' | ';
            }
            var u = users.find(p => { return p._id === access[access.length - 1]; });
            text += u.name;
            return <ScrollableCell>{text}</ScrollableCell>;
        },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="SALAS"
        subtitle="Gerencie as salas e recintos de sua organização."
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          loading={(isLoading && isLoading2) || !data}
          getRowId={(row) => row._id}
          rows={data || {}} columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Rooms;
