import { createContext } from "react";

export const OrderContext = createContext({
  order: undefined,
  setOrder: (order) => {},
});
