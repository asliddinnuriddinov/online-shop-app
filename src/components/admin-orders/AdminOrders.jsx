import React, { useEffect, useState } from 'react';
import "./AdminOrders.scss"
import { NavLink, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderThunk } from '../../redux/actions/orderThunk';

const AdminOrders = (props) => {
    useEffect(()=>{
        props.orderThunk()
    },[])
    
  return (
    <div className='admin__orders'>
        <h1>
        Буюртмалар
        </h1>
            <ul className="admin__orders-nav">
                <li>
                    <NavLink className={({isActive})=>isActive?"admin__orders__active__link":""} to='/admin/orders/all'>Барча буюртмалар</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>isActive?"admin__orders__active__link":""} to="/admin/orders/uncalled">Aлоқага чиқилмаган буюртмалар</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>isActive?"admin__orders__active__link":""} to={'/admin/orders/called'}>Aлоқага чиқилган буюртмалар</NavLink>
                </li>
            </ul>
                <Outlet/>
    </div>
  )
}

export default connect (null,{orderThunk})(AdminOrders)