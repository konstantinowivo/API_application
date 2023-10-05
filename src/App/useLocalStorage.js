import React from "react";

function useLocalStorage(itemNAme, initialValue){

    let localStorageItem = localStorage.getItem(itemNAme)
    let parsedItem;

    if(!localStorageItem) {
    localStorage.setItem(itemNAme, JSON.stringify(initialValue));
    parsedItem = initialValue;
    } else {
    parsedItem = JSON.parse(localStorageItem) ;
    }

    const [item, setItem] = React.useState(parsedItem);
    
    const saveItem = (newItem) => {
    localStorage.setItem(itemNAme, JSON.stringify(newItem));
    setItem(newItem)
    }

    return [item, saveItem]
}  

export { useLocalStorage };