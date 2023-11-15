import React from 'react';
import "./Admin.scss"
import AdminAside from '../../components/admin-aside/AdminAside';
import {Container} from "../../utils/Utils"
import AdminCreate from '../../components/admin-create/AdminCreate';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className='admin'>
      <Container>
      <div className="admin__wrapper">
      <AdminAside/>
      <Outlet/>
      </div>
      </Container>
    </div>
  )
}

export default Admin