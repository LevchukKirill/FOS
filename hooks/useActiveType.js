import { createContext } from "react";

export const ActiveTypeContext = createContext({
  activeType: undefined,
  setType: (activeType) => {},
});
