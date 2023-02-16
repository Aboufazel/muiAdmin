const GiveIdReducer = (state, action) => {

    const { type, payload } = action;
    switch (type){
        case 'UserData':
            return payload;
        default:
            return state
    }
}

export default GiveIdReducer;