import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [results, setResults] = useState();
  const [audioFile, setAudioFile] = useState();
  const [audioSrc, setAudioSrc] = useState();
  const [ currentStep, setCurrentStep ] = useState('') 
  const [ isLoading, setIsLoading ] = useState('') 

  return (
    <GlobalContext.Provider value={{ results, setResults, audioFile, setAudioFile, audioSrc, setAudioSrc, currentStep, setCurrentStep, isLoading, setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
