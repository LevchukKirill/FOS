import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export function getKey(food) {
  return `f${food.id}`;
}
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const food = action.payload;
      const id = getKey(food);
      if (!state[id]) state[id] = { data: food, amount: 0 };
      state[id].amount++;
    },
    removeFromBasket: (state, action) => {
      const food = action.payload;
      const id = getKey(food);
      if (!state[id]) return;
      if (state[id].amount === 1) {
        delete state[id];
        return;
      }
      state[id].amount--;
    },
    clearBasket: (state, action) => {
      state = undefined;

      return state;
    },
  },
});

export const { actions, reducer } = basketSlice;
