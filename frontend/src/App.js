import './App.css';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Components/login/Login';
import { Signup } from './Components/signup/Signup';
import { User } from './Components/team/User';
import { Contacts } from './Components/team/Contacts';
import { UserUpdate } from './Components/update/UserUpdate';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { PageLayout } from "./Components/layout/PageLayout"
import { ToastContainer} from 'react-toastify';


function App() {
    const token = localStorage.getItem("accessToken")
    const { accessToken, userId } = useSelector((state) => state.auth);
    useEffect(() => {
        if (
            !localStorage.getItem("accessToken") ||
            !localStorage.getItem("userId")
            ) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("userId", userId);
            }
        }, [accessToken, userId]);

    return (
        <>
        <BrowserRouter>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
            <div className='app'>
                <Routes>
                    <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/*" element={<Login />} />
                    <Route path="/" element={<PageLayout />}>
                        <Route path="/home" element={<User />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/user" element={<UserUpdate />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
        </>

    )
}

export default App;