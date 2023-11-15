import React from 'react';
import Main from "../../components/main/Main.jsx"
import SubFooter from '../../components/sub-footer/SubFooter.jsx';
import Banner from '../../components/banner/Banner.jsx';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const Home = () => {
  useTranslation()
  const cartState=useSelector(state=>state?.cartState.cartState)
  const state=localStorage.getItem("cartState")
  localStorage.setItem("cartState",false)
  return (
    <>
        <div style={localStorage.getItem("cartState")==false?{backgroundColor:"rgba(0, 0, 0, 0.418)",position:"fixed",top:"0",left:"0",zIndex:"7",width:"100vw",height:"100vh"}:null}>
        </div>
        <Banner/>
        <Main/>
        <SubFooter/>
        
    </>
  )
}

export default Home