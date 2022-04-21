import { createContext, useContext, useState } from "react";

const MarkerContext = createContext();

export const MarkerProvider = ({ children }) => {
    const [markerCoords, setMarkerCoords] = useState([]);
    const value = {markerCoords, setMarkerCoords};
    return <MarkerContext.Provider value={value}></MarkerContext.Provider>
}

export const useMarkerCoords = () => {
    const context = useContext(MarkerContext);
    if (context === undefined) {
        throw new Error('must use useMarkerCoords in MarkerContext provider')
    }
    return context;
}