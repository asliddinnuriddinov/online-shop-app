import React, { useEffect, useState } from 'react'
import { instance } from '../../api/axios';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const AuthContainer = () => {
    const [tokenValid,setTokenValid]=useState(false);
    const dispatch=useDispatch()

    useEffect(()=>{
        instance("/validation/validate-token",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("admin-auth-token")
            }
        })
        .then(responce=>{
            if(responce.status===200){
                setTokenValid(true)
            }
            else{
                setTokenValid(false)
            }
        })
        .catch(err=>{
            if(err.status===401||err.status===403){
                setTokenValid(false);
                dispatch({type:"LOGOUT"})
            }
            else{
                setTokenValid(false)
                dispatch({type:"LOGOUT"})
            }
        })
    },[])
  return tokenValid? (
    <Outlet/>
  ):<></>
}

export default AuthContainer