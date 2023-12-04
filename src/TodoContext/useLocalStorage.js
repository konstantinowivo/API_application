import React from "react";

function useLocalStorage(itemNAme, initialValue){

    const [item, setItem] = React.useState(initialValue);

    const [loading, setLoading] = React.useState(true);
    
    const [error, setError] = React.useState(false)


React.useEffect(() => {


    setTimeout(() =>{
        try{
            let localStorageItem = localStorage.getItem(itemNAme)
            let parsedItem;
        
            if(!localStorageItem) {
                localStorage.setItem(itemNAme, JSON.stringify(initialValue));
                parsedItem = initialValue;
                } else {
                parsedItem = JSON.parse(localStorageItem) ;
                setItem(parsedItem)
                }
        
            setLoading(false)}
            catch{
                setLoading(false);
                setError(true)
            }
    }, 2000); 
    // eslint-disable-next-line
}, [])
    
const saveItem = (newItem) => {
    localStorage.setItem(itemNAme, JSON.stringify(newItem));
    setItem(newItem)
}

    return {
        item,
        saveItem,
        loading,
        error,
    }
}  

export { useLocalStorage };