import { createContext } from "react";

export const TypeContext = createContext({
  type: undefined,
  setType: (type) => {},
});
