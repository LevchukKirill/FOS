import { createContext } from "react";

export const SwipeEnabledContext = createContext({
  swipeEnabled: true,
  setSwipeEnabled: (swipeEnabled) => {},
});
