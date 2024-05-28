import { createContext } from "react";

export const ActiveRestaurantContext = createContext({
  activeType: undefined,
  setType: (activeRestaurant) => {},
});
