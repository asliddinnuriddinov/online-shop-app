const initialState={
    token: localStorage.getItem('admin-auth-token')||""
}

const adminReducer=(state=initialState,action)=>{
    switch(action.type){
        case "LOGIN_ADMIN":
            return ({
                token:action.payload.token
            })

        case "LOGOUT":
            localStorage.removeItem("admin-auth-token");
            return({
                token:""
            })    

        default:
            return state
    }
}


export default adminReducer