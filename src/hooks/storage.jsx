

import { useState, useEffect } from "react";

function useStorage(
    key,
    initialValue
){
    const rawInitialValue = JSON.stringify(initialValue);
    let value = initialValue;
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
        localStorage.setItem(key, rawInitialValue);
    } else {
        value = JSON.parse(rawValue);
    }


    const [state, setState] = useState(value);
    const setStorage = (value => {
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    });

    useEffect(() => {
        const rawValue = localStorage.getItem(key);
        if (!rawValue) {
            localStorage.setItem(key, rawInitialValue);
        } else {
            const value = JSON.parse(rawValue);
            setState(value);
        }
    }, [key]);

    return [state, setStorage];
}


export default useStorage;