import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as basketReducer } from "./basket/BasketSlice";

const reducers = combineReducers({
  basket: basketReducer,
});

export const store = configureStore({
  reducer: reducers,
});
