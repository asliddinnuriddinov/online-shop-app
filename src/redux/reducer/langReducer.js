const initialState={
    langCode:localStorage.getItem("lang")
}

const reducerName = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LANG':
            return({
                langCode: action.langCode
            })
        default:
            return state
    }
}


export default reducerName;