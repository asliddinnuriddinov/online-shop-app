import axios from "axios";
import store from "../redux/store"

const instance=axios.create({
    baseURL:"https://mold-components.onrender.com",
    // baseURL:"https://tame-hen-baseball-cap.cyclic.app/product/all",
    headers:{'Content-Type': 'application/json', "Authorization" : "Bearer " + localStorage.getItem("admin-auth-token")},
    timeout:10000
});

// instance.interceptors.response.use(
//     (responce)=>{
//         if(responce)
//         return responce;
//     },
//     (err)=>{
//         if(err?.responce?.status==401||err?.responce?.status==403){
//             store.dispatch({type:"LOGOUT"})
//         }
//         return Promise.reject(err)
//     }
// )

export { instance }