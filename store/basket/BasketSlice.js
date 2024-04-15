import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const food = action.payload;
      if (!state[food.id]) state[food.id] = { data: food, amount: 0 };
      state[food.id].amount++;
    },
    removeFromBasket: (state, action) => {
      const food = action.payload;
      if (!state[food.id]) return;
      if (state[food.id].amount === 1) {
        delete state[food.id];
        return;
      }
      state[food.id].amount--;
    },
  },
});

export const { actions, reducer } = basketSlice;
