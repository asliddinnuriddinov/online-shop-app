import { ORDER_PRODUCTS } from "../action-types";
import { instance } from "../../api/axios";

const orderAction=(data)=> {
    return({
        payload:data,
        type:ORDER_PRODUCTS
    })
}

export const orderThunk=()=> async dispatch=>{
    instance('/order/all-orders',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem('admin-auth-token')
        }
    })
    .then(responce=>dispatch(orderAction(responce.data.allOrders)))
    .catch(err=>console.error(err))
}