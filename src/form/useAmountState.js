import { useReducer, useCallback } from "react";

export default function useAmountState(quantity, price) {
  const reducer = useCallback(
    (state, action) => {
      switch (action.type) {
        case "price":
          return {
            price: action.price,
            quantity: Math.floor(action.price / price)
          };
        case "quantity":
          return { price: price * action.quantity, quantity: action.quantity };
        default:
          return state;
      }
    },
    [price]
  );

  const [state, dispatch] = useReducer(reducer, {
    quantity,
    price: quantity * price
  });

  const updateQuantity = useCallback(updated_quantity =>
    dispatch({ type: "quantity", quantity: updated_quantity })
  );

  const updatePrice = useCallback(updated_price =>
    dispatch({ type: "price", price: updated_price })
  );

  return [state.quantity, state.price, updateQuantity, updatePrice];
}
