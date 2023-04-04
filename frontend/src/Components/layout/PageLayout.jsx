import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';
import { Topbar } from '../topbar/Topbar';
import { Navigate } from 'react-router-dom';

export const PageLayout = () => {
    
    const token = localStorage.getItem("accessToken")
    if (!token )  {
        return (
         <Navigate to="/login"/>)
    }
    return <div style={{
        padding: '0px 0px 0px 270px'
    }}>
        <Sidebar />
        <Topbar />
        <Outlet />
    </div>;
};
