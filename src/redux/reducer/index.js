import { combineReducers } from "redux";
import langReducer from "./langReducer";
import cartStateReducer from "./cartStateReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import adminReducer from "./adminReducer";
import orderProductsReducer from "./orderReducer";

const rootReducer=combineReducers({
    lang: langReducer,
    cartState:cartStateReducer,
    cartProducts:cartReducer,
    orderReducer: orderReducer,
    admin: adminReducer,
    orderProducts: orderProductsReducer
})

export default rootReducer;