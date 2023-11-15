import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import validateToken from '../../helpers/validateToken';
import AuthContainer from '../auth-container/AuthContainer';

const AdminPrivate = () => {
    const {token}=useSelector(state=>state.admin)
    // && validateToken(token)
    return token ?(
        <AuthContainer>
            <Outlet/>
        </AuthContainer>
    )
    :
    <Navigate to={'/login'}/>
}

export default AdminPrivate