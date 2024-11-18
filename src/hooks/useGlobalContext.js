import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
