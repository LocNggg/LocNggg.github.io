import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";
import './UserUpdate.css'
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useNavigate } from "react-router-dom";
export const UserUpdate = () => {
  const [newData, setNewData] = useState(null);
  const id = localStorage.getItem("userId");
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([])
  // const navigate = useNavigate();
  const handleGetUsers = async () => {
    try {
      const { data: res } = await axios.get(`${BASE_URL_USER}`, {
        headers,
      });
      setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetUsers();
  }, []);
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

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.put(
        `${BASE_URL_USER}/${id}/update`,
        newData,
        {
          headers,
        }
      );
      console.log(res);
      // window.location.href = "/user";
      // navigate("/user");
      toast.success('User updated!', {
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
  const submitDelete = () => {
    confirmAlert({
      title: 'Delete account',
      message: 'Are you sure to delete this account?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleRemoveUser()
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const handleRemoveUser = async (e) => {
    // e.preventDefault();
    try {
      const { data: res } = await axios.delete(
        `${BASE_URL_USER}/${id}/delete`,
        {
          headers,
        }
      );
      console.log(res);
      setUsers(users.filter((user) => user._id !== id));
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      window.location.href = "/login"
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

  return (
    <div className="container-xl px-4 mt-4">
      <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details" target="__blank">Profile</a>
      </nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <img className="img-account-profile rounded-circle mb-2"
                alt="profile-user"
                src="https://cdn-icons-png.flaticon.com/512/219/219983.png" />
              <div className="small font-italic text-muted mb-4">{currentUser.username}</div>
              <button className="btn delete" onClick={submitDelete}>Delete my account</button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form onSubmit={handleUpdateUser}>
                <div className="mb-3">
                  <label className="small mb-1">Email address</label>
                  <input className="form-control" type="email" placeholder="Enter your email address" defaultValue={currentUser.email} name="email" onChange={handleChange} />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1">First name</label>
                    <input className="form-control" type="text" placeholder="Enter your first name" defaultValue={currentUser.firstname} name="firstname" onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1">Last name</label>
                    <input className="form-control" type="text" placeholder="Enter your last name" defaultValue={currentUser.lastname} name="lastname" onChange={handleChange} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small mb-1">Username (how your name will appear to other users on the site)</label>
                  <input className="form-control" type="text" placeholder="Enter your username" defaultValue={currentUser.username} name="username" onChange={handleChange} />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1">Phone number</label>
                    <input className="form-control" type="tel" placeholder="Enter your phone number" defaultValue={currentUser.phone} name="phone" onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1">Location</label>
                    <input className="form-control" type="text" placeholder="Enter your location" defaultValue={currentUser.location} name="location" onChange={handleChange} />
                  </div>
                </div>
                <div className="btn-container">
                  <button className="btn">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
