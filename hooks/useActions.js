import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as basket } from "../store/basket/BasketSlice";
import { actions as orders } from "../store/order/OrdersSlice";

export const useActions = () => {
  const dispatch = useDispatch();

  const rootAction = {
    ...basket,
    ...orders,
  };

  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
