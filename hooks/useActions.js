import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as basket } from "../store/basket/BasketSlice";

export const useActions = () => {
  const dispatch = useDispatch();

  const rootAction = {
    ...basket,
  };

  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
