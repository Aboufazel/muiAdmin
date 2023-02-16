const ReturnDataReducer = (state, action) => {

    const { type, payload } = action;
    switch (type){
        case 'AccountData':
            return payload;
        default:
            return state
    }
}

export default ReturnDataReducer;








