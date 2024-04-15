import { useSelector } from "react-redux";

export const useBasket = () => {
  const { basket } = useSelector((state) => state);
  console.log(basket);

  return { basket };
};
