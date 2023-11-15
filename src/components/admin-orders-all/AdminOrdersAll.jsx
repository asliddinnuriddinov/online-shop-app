import React, { useEffect, useState } from 'react';
import "./AdminOrdersAll.scss"
import { useSelector } from 'react-redux';
import { FiShoppingCart,FiPhoneCall,FiTrash2, FiCheckCircle } from "react-icons/fi"
import { instance } from '../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { orderThunk } from '../../redux/actions/orderThunk';

const AdminOrdersAll = (props) => {
    const data=useSelector(state=>state.orderProducts.orderProducts[0]);
    const [detailsData,setDetailsData]=useState(null);
    const [detailsOpen,setDetailsOpen]=useState(false);
    const [orderPopUpOpen,setOrderPopUpOpen]=useState(false);
    const [orderPopUpData,setOrderPopUpData]=useState(null)

    function updateOrder(id,type){
        if(type=="make-contacted"){
        instance.patch(`/order/update-single-order/${id}`, {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("admin-auth-token")
            }
        })
        .then(responce=>{
            if(responce.status==200){
                toast.success("Мувафакиятли озгартирилди!")
                setOrderPopUpOpen(false);
                props.orderThunk()
            }
        })
        .catch(err=>{
            if(err.status==401||err.status==403){
                toast.success("Озгартиришда хатолик юз берди")
                setOrderPopUpOpen(false)
            }
        })
        }
        else if(type=="deleteOrder"){
            instance.delete(`/order/delete-single-order/${id}`,{
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("admin-auth-token")
                }
            })
            .then(responce=>{
                if(responce.status==200){
                    toast.success("Мувафакиятли озгартирилди!")
                    setOrderPopUpOpen(false);
                    props.orderThunk()
                }
            })
            .catch(err=>{
                if(err.status==401||err.status==403){
                    toast.success("Озгартиришда хатолик юз берди")
                    setOrderPopUpOpen(false)
                }
            })
        }
    }
    function displayDetails(x){
        setDetailsOpen(true);
        setDetailsData({
            x:x,
            time:x.orderedAt
        });
    }
    function displayPopUp(x,type){
        setOrderPopUpOpen(true);
        if(type=="make-contacted"){
            setOrderPopUpData({p:"Буюртмани янгилаш",span:"Ҳақиқатдан ҳам, буюртмани янгиламоқчимисз?",x:x,type:type})
        }
        else if(type=="deleteOrder"){
            setOrderPopUpData({p:"Буюртмани ўчириш",span:"Ҳақиқатдан ҳам, буюртмани ўчирмоқчимисиз?",x:x,type:type})
        }
    }
    function filterOrder(){
        if(orderPopUpData.type=="make-contacted"){
            updateOrder(orderPopUpData.x._id,"make-contacted")
        }
        else if(orderPopUpData.type=="deleteOrder"){
            updateOrder(orderPopUpData.x._id,"deleteOrder")
        }
    }
    function calcSum(arr){
        let sum=0;
        arr?.map(x=>sum+=x.quantity)
        return sum;
    }
    function calcTotalSum(arr){
        let sum=0;
        arr?.map(x=>sum+=x.cost*x.quantity)
        return sum;
    }
  return (
    <div className='orders__all'>
        {
            data?.map(x=>

                        <div key={x._id} className="orders__all__item">
                            <div className="orders__all-user">
                                <div className='shopping__icon'>
                                <FiShoppingCart />
                                </div>
                                
                                <div className="orders__user-info">
                                    <p>{x.fullname}</p>
                                    <span>{x.phonenumber}</span>
                                    <div className={x.contacted?"order__status contacted":"order__status not__contacted"}>
                                        <span></span>
                                        {x.contacted?"Aлоқага чиқилди":"Aлоқага чиқилмади"}
                                    </div>
                                </div>
                                <a href={"tel:"+x.phonenumber}><FiPhoneCall/></a>
                            </div>

                            <div className="orders__time-info">
                                <p>Маҳсулот буюртма вақти: </p>
                                <span>{x.orderedAt.replaceAll('"',"")}</span>
                            </div>
                            <div className="orders__product-info">
                                <div className="orders__product-count">
                                    <p>Маҳсулот умумий сони: </p>
                                    <span>{calcSum(x.orderedproducts)}</span>
                                </div>
                                <div className="orders__product-price">
                                    <p>Маҳсулот умумий нархи:  </p>
                                    <span>{calcTotalSum(x.orderedproducts)} CУМ</span>
                                </div>
                            </div>
                            <div className="orders__item-actions">
                                <button onClick={()=>displayDetails(x)} className='orders__btn-more'>Батафсил</button>
                                <button onClick={()=>displayPopUp(x,"make-contacted")} className='orders__btn-contact '>Aлоқага чиқилди</button>
                                <button onClick={()=>displayPopUp(x,"deleteOrder")} className='orders__btn-delete'>Буюртмани ўчириш</button>
                            </div>
                        </div>
                )
        }
        <div style={detailsOpen?{display:"grid"}:{display:"none"}} className="order__details">
            <div className="order__details-wrapper">
                <button className='details__close-btn' onClick={()=>setDetailsOpen(false)}>x</button>
                <h3>Буюртма маҳсулотлар</h3>
                <div className="order__details-main">
                    <div className="order__details-left">
                        {
                            detailsData?.x.orderedproducts?.map(x=>
                                <div key={uuidv4()} className="order__details-item">
                                <h4>{x.product.productName_uz} - {x.product.productSizesAndQuantity[0].size}</h4>
                                <div className="details-item-info">
                                    <img width={100} src={x.product.productImages[[0]]} alt="" />
                                    <div className="details-item-info-1">
                                    <div className="orders__time-info">
                                        <p>Маҳсулот буюртма вақти: </p>
                                        <span>{detailsData.time.replaceAll('"',"")}</span>
                                    </div>
                                    <div className="orders__product-count">
                                    <p>Маҳсулот умумий сони: </p>
                                    <span>{x.quantity}</span>
                                </div>
                                    </div>
                                    <div className="details-item-info-2">
                                        <div className="orders__product-cost">
                                            <p>Битта маҳсулот нархи:   </p>
                                            <span> {x.cost} CУМ</span>
                                        </div>
                                        <div className="orders__product-price">
                                            <p>Маҳсулот умумий нархи:  </p>
                                            <span>{x.cost*x.quantity} CУМ</span>
                                        </div>

                                    </div>
                                </div>
                                </div>
                                )

                        }
                    </div>

                        <div className="order__details-right">
                            <h4>{detailsData?.x?.fullname}</h4>
                            <p>Буюртма умумий:</p>
                            <span>{calcTotalSum(detailsData?.x?.orderedproducts)} CУМ</span>
                            <p>Буюртма сони:</p>
                            <span>{calcSum(detailsData?.x?.orderedproducts)} ta</span>
                            <button onClick={()=>displayPopUp(detailsData?.x,"make-contacted")} className='orders__btn-contact '><FiCheckCircle/> Aлоқага чиқилди</button>
                            <button onClick={()=>displayPopUp(detailsData?.x,"deleteOrder")} className='orders__btn-delete'> <FiTrash2/>Буюртмани ўчириш</button>
                        </div>

                </div>
            </div>
        </div>  

                        <div style={orderPopUpOpen?{display:"grid"}:{display:"none"}} className="order__pop__up">
                                <div className="order__pop__up-wrapper">
                                    <p>{orderPopUpData?.p}</p>
                                    <span>{orderPopUpData?.span}</span>
                                    <div className="order__pop__up-btn">
                                        <button onClick={filterOrder} style={{background:"rgb(0, 255, 0)"}}>Ха</button>
                                        <button style={{background:"red"}} onClick={()=>{setOrderPopUpOpen(false);setOrderPopUpData(null)}}>Ёқ</button>
                                    </div>
                                </div>
                        </div>
                        
    </div>
  )
}

export default connect(null,{orderThunk})(AdminOrdersAll)