import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as basketReducer } from "./basket/BasketSlice";
import { reducer as ordersReducer } from "./order/OrdersSlice";

const reducers = combineReducers({
  basket: basketReducer,
  orders: ordersReducer,
});

export const store = configureStore({
  reducer: reducers,
});
