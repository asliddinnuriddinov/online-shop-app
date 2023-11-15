const cartState=true;

const cartStateReducer=(state=cartState,action)=>{
    switch (action.type) {
        case 'CHANGE_CART_STATE':
            return({
                cartState: action.changedCartState
            })
        default:
            return state
    }
}

export default cartStateReducer;