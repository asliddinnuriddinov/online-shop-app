const initialState={
    orderProducts:[]
}

const orderReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ORDER_PRODUCTS":
            return({
                orderProducts:[...state.orderProducts,action.payload]
            })

        default:
            return state
    }
}

export default orderReducer