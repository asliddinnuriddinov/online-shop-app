import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { FiEye,FiEyeOff } from "react-icons/fi"
import { TbLoaderQuarter } from "react-icons/tb";
import { useEffect, useState } from "react";
import { instance } from "../../api/axios";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";

const Login = () => {
    const [inp,setInp]=useState('');
    const [password,setPassword]=useState('');
    const [passwordOpen,setPasswordOpen]=useState(false);
    const [isFetched,setIsFetched]=useState(false);
    const [wrongLogin,setWrongLogin]=useState(false);
    const dispatch=useDispatch()
    let navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('admin-auth-token')){
            navigate('/admin/create')
        }
    },[])


    function loginUser(e){
        e.preventDefault();

            setIsFetched(true);

            instance.post('/auth/login',{
                username:inp,
                password
            }).then(responce=>{
                if(responce.data.token){
                    localStorage.setItem("admin-auth-token",responce.data.token);
                    toast.success("Successfully logged in!");
                    setWrongLogin(false)
                    setInp("");
                    setPassword("");
                    dispatch({payload:responce.data,type:"LOGIN_ADMIN"})
                    navigate("/admin/create")
                }
                setIsFetched(false);
            })
            .catch(err=>{
                console.error(err);
                setIsFetched(false);
                toast.error("Username or password is incorrect!");
                setWrongLogin(true);
            })
    }



  return (
    <div className="login">
        <div className="login__left">
            <form onSubmit={loginUser}>
                <h1>Кириш</h1>
                <input style={wrongLogin?{border:"1px solid red"}:{border:"1px solid grey"}} required value={inp} onChange={e=>setInp(e.target.value)} type="text" placeholder="Фойдаланувчи номингизни киритинг" minLength={5} />
                <div style={wrongLogin?{border:"1px solid red"}:{border:"1px solid grey"}} className="login__password">
                    <input required value={password} onChange={e=>setPassword(e.target.value)}  className="password__inp" type={passwordOpen?"text":"password"} placeholder="Фойдаланувчи паролингизни киритинг" minLength={8} />
                    {
                        passwordOpen?
                        <FiEyeOff onClick={e=>setPasswordOpen(!passwordOpen)}/>
                        :
                        <FiEye onClick={e=>setPasswordOpen(!passwordOpen)}/>
                    }
                </div>
                <button disabled={isFetched} type="submit">{isFetched?<TbLoaderQuarter/> : "Кириш"}</button>

                <Link to="/">Асосий саҳифа</Link>
            </form>
        </div>

        <div className="login__right">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/020/696/296/small/3d-minimal-user-authentication-concept-user-verification-concept-user-login-page-3d-illustration-png.png" alt="" />
        </div>
    </div>
  )
}

export default Login