const initialState={
    cartProducts:[]
}

const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            let position=state.cartProducts.findIndex(x=>x.productSizesAndQuantity[0].size==action.addedCartProduct.productSizesAndQuantity[0].size)
                // if(position==-1){
                //     return({
                //         cartProducts:[...state.cartProducts,action.addedCartProduct]
                //     })
                // }
                // else{
                //     // console.log(state.cartProducts);
                //     if(state.cartProducts[position].count<state.cartProducts[position].productSizesAndQuantity[0].quantity){
                //         state.cartProducts[position].count=state.cartProducts[position].count+1;
                //         return({
                //             cartProducts:[...state.cartProducts]
                //         })
                //     }
                // }
                
                 return({
                        cartProducts:[...state.cartProducts,action.addedCartProduct]
                        })

                case "DELET_ALL_CART":
                    state.cartProducts.splice(0,state.cartProducts?.length)
                    return({
                        cartProducts:[...state.cartProducts]
                    })

                 case "DELET_PRODUCT_CART":
                    let deletePosition=state.cartProducts.findIndex(x=>x._id==action.singleProduct);
                    state.cartProducts.splice(deletePosition,1)
                    return({
                        cartProducts:[...state.cartProducts]
                    })

                    case "PLUS_COUNT":
                        if(state.cartProducts[action.payload].count<state.cartProducts[action.payload].productSizesAndQuantity[0].quantity){
                            state.cartProducts[action.payload].count+=1;
                            return({
                                cartProducts:[...state.cartProducts]
                            })
                        }
                        else
                        return state
                     case "MINUS_COUNT":
                           if(state.cartProducts[action.payload].count>1){
                            state.cartProducts[action.payload].count-=1;
                            return({
                                cartProducts:[...state.cartProducts]
                            })
                           }
                       


            default:
                return state
    }
}

export default cartReducer;