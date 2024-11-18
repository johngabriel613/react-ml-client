import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [results, setResults] = useState();
  const [audioFile, setAudioFile] = useState();

  return (
    <GlobalContext.Provider value={{ results, setResults, audioFile, setAudioFile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
