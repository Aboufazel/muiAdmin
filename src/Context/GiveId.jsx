import {createContext, useReducer} from 'react';
import GiveIdReducer from "../Reducer/GiveId.reducer";

export const GiveIdContext = createContext({state:[] , dispatch:()=>{}});


const GiveContextProvider = ({children}) => {
    const [authData , dispatch] = useReducer(GiveIdReducer);
    return(
        <GiveIdContext.Provider value={{authData , dispatch}}>
            {children}
        </GiveIdContext.Provider>
    )
}


export default GiveContextProvider;