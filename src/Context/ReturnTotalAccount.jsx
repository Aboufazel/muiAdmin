import {createContext, useReducer} from 'react';
import ReturnDataReducer from "../Reducer/ReturnData.reducer";

export const ReturnTotalAccountContext = createContext({ReturnState:[] , Dispatch:()=>{}});


const ReturnTotalProvider = ({children}) => {
    const [AccountData , Dispatch] = useReducer(ReturnDataReducer);
    return(
        <ReturnTotalAccountContext.Provider value={{AccountData , Dispatch}}>
            {children}
        </ReturnTotalAccountContext.Provider>
    )
}


export default ReturnTotalProvider;