import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import './Team.css'

export const User = ({ }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 100,
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 200,
      flex: 1
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      width: 150,
      flex: 1,
      renderCell: ({ row: { isAdmin } }) => {
        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isAdmin === true
                ? "#3da58a"
                : "#2e7c67"
            }
            color={
              isAdmin === true
                ? "white"
                : "black"
            }
            borderRadius="4px"
          >
            {isAdmin === true && <AdminPanelSettingsOutlinedIcon />}
            {isAdmin === false && <LockOpenOutlinedIcon />}
            <Typography sx={{ ml: "5px", p: "2px" }}>
              {isAdmin === true ? "Admin" : "User"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "_id",
      headerName: "Account Id",
      width: 250,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 100,
      renderCell: (data) => {
        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => submitDelete(data.row._id)}
            >
              Delete
            </Button>
          </Stack>
        )
      },
    },
  ];

  const columns0 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 100,
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 200,
      flex: 1
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      width: 150,
      flex: 1,
      renderCell: ({ row: { isAdmin } }) => {
        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isAdmin === true
                ? "#3da58a"
                : "#2e7c67"
            }
            color={
              isAdmin === true
                ? "white"
                : "black"
            }
            borderRadius="4px"
          >
            {isAdmin === true && <AdminPanelSettingsOutlinedIcon />}
            {isAdmin === false && <LockOpenOutlinedIcon />}
            <Typography sx={{ ml: "5px", p: "2px" }}>
              {isAdmin === true ? "Admin" : "User"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "_id",
      headerName: "Account Id",
      width: 250,
      flex: 1,
    },
  ];
  const submitDelete = (props) => {
    confirmAlert({
      title: 'Delete account',
      message: 'Are you sure to delete this account?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleRemoveUser(props)
        },
        {
          label: 'No',
        }
      ]
    });
  }
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const id = localStorage.getItem("userId");
  // get current user
  const handleGetCurrentUser = async () => {
    try {
      const { data: res } = await axios.get(`${BASE_URL_USER}/user/${id}`, {
        headers,
      });
      setCurrentUser(res);
    } catch (error) { }
  };
  useEffect(() => {
    handleGetCurrentUser();
  }, [id]);

  const handleGetUsers = async () => {
    setIsLoading(true);
    try {
      const { data: res } = await axios.get(`${BASE_URL_USER}`, {
        headers,
      });
      const addIndex = res.map((user, index) => {
        return {
          ...user,
          id: index + 1,
        };
      });
      console.log(addIndex);
      setUsers(addIndex);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);
  
  const handleRemoveUser = async (userId) => {
    try {
      const { data: res } = await axios.delete(
        `${BASE_URL_USER}/${userId}/delete`,
        {
          headers,
        }
      );
      console.log(res);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success('User deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="container-xl px-4 mt-4">
      <nav className="nav nav-borders">
        <a className="nav-link active ms-0" target="__blank">Accounts</a>
      </nav>
      <Box m="2px">
        <Box
          m="5px 0 0 0"
          height="85vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              color: "white",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#94e2cd",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#1F2A40",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#3e4396",
            },
            "& .MuiCheckbox-root": {
              color: "#b7ebde!important",
            },
            "& .MuiTablePagination-displayedRows": {
              color: "white",
            }
          }}
        >
          <DataGrid rows={users} columns={currentUser.isAdmin == true ? columns : columns0} autoHeight initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }} slots={{ toolbar: GridToolbar }} />
        </Box>
      </Box>
    </div>
  );
};
