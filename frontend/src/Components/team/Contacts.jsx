import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";
import React, { useEffect, useState } from "react";
import axios from "axios";
import './Team.css'


export const Contacts = ({ }) => {
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
            field: "firstname",
            headerName: "First Name",
            width: 100,
            flex: 1,
        },
        {
            field: "lastname",
            headerName: "Last Name",
            width: 100,
            flex: 1,
        },
        {
            field: "location",
            headerName: "Address",
            width: 200,
            flex: 1
        },
        {
            field: "phone",
            headerName: "Phone Number",
            width: 200,
            flex: 1
        },
    ];
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


    if (isLoading) return <h1>Loading...</h1>;
    return (
        <div className="container-xl px-4 mt-4">
            <nav className="nav nav-borders">
                <a className="nav-link active ms-0" target="__blank">Contacts</a>
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
                    <DataGrid rows={users} columns={columns} autoHeight initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }} slots={{ toolbar: GridToolbar}}/>
                </Box>
            </Box>
        </div>
    );
};
