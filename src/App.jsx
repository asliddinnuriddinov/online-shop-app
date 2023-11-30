import { memo } from "react";
import "./App.scss";
import { Routes,Route } from "react-router-dom";
import Home from "./routes/home/Home";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Sponsor from "./routes/sponsor/Sponsor";
import About from "./routes/about/About";
import Contact from "./routes/contact/Contact";
import ProductView from "./routes/product-view/ProductView";
import ScrollToTop from "./scrollToTop/Scroll";
import MainCategory from "./routes/main-category/MainCategory";
import SubCategory from "./routes/sub-category/SubCategory";
import Login from "./routes/login/Login";
import Admin from "./routes/admin/Admin";
import { ToastContainer } from 'react-toastify';
import Cart from "./components/cart/Cart";
import AdminCreate from "./components/admin-create/AdminCreate";
import AdminOrders from "./components/admin-orders/AdminOrders";
import AdminOrdersAll from "./components/admin-orders-all/AdminOrdersAll";
import AdminOrdersCalled from "./components/admin-orders-called/AdminOrdersCalled";
import AdminOrdersUncalled from "./components/admin-orders-uncalled/AdminOrdersUncalled";
import AdminPrivate from "./routes/private/AdminPrivate";
import AdminManage from "./components/admin-manage/AdminManage";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const cartState=useSelector(state=>state.cartState.cartState);
  const dispatch=useDispatch();
  return (
    <> 
        <ScrollToTop/>
        <Cart/>

    <div onClick={e=>{dispatch({type:"CHANGE_CART_STATE",changedCartState:false});document.body.style.overflow="auto"}} style={cartState?{width:"100vw",height:"100vh",position:"fixed",top:"0",left:"0",background:"rgba(0, 0, 0, 0.333)",zIndex:"9"}:{width:"0",height:"0"}}>
    </div>
    <Nav/>  
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sponsor" element={<Sponsor/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<AdminPrivate/>}>
          <Route path="/admin" element={<Admin/>}>
            <Route path="/admin/create" element={<AdminCreate/>} />
            <Route path="/admin/orders" element={<AdminOrders/>}>
              <Route path="/admin/orders/all" element={<AdminOrdersAll/>}/>
              <Route path="/admin/orders/called" element={<AdminOrdersCalled/>}/>
              <Route path="/admin/orders/uncalled" element={<AdminOrdersUncalled/>}/>
            </Route>
            <Route path="/admin/manage" element={<AdminManage/>}/>
          </Route>
          </Route>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/product-view/:id" element={<ProductView/>}/>
          <Route path="/maincategory/:mainCategoryName" element={<MainCategory/>}/>
          <Route path="/subcategory/:subCategoryName" element={<SubCategory/>}/>
        </Routes>
        <ToastContainer limit={2}/>
        <Footer/>

    

    </>
  )
}

export default memo(App)
