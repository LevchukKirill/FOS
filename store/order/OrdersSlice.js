import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => ({
  restaurantId: undefined,
  orderId: undefined,
  status: undefined,
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState: getInitialState(),
  reducers: {
    // addToBasket: (state, action) => {
    //     const food = action.payload;
    //     if (food.restaurantId !== state.restaurantId && state.restaurantId)
    //         basketSlice.caseReducers.clearBasket(state, action);
    //     else state.restaurantId = food.restaurantId;
    //     const id = getKey(food);
    //     if (!state.foods[id]) state.foods[id] = { data: food, amount: 0 };
    //     state.foods[id].amount++;
    // },
    removeOrder: (state, action) => {
      const food = action.payload;
      const id = getKey(food);
      if (!state.foods[id]) return;
      if (state.foods[id].amount === 1) {
        delete state.foods[id];
        return;
      }
      state.foods[id].amount--;
    },
    clearBasket: (state, action) => {
      state = getInitialState();

      return state;
    },
  },
});

export const { actions, reducer } = ordersSlice;
