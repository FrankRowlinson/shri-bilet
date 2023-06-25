import { cartActions } from "@/store/features/cart";
import { selectTicketAmount } from "@/store/features/cart/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useState } from "react";

const useCart = (movieId: string) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const dispatch = useAppDispatch();
  const count = useAppSelector(
    (state) => selectTicketAmount(state, movieId) || 0
  );

  const showConfirmationModal = () => setConfirmationOpen(true);
  const closeConfirmationModal = () => setConfirmationOpen(false);

  const increment = () => dispatch(cartActions.addTicket(movieId));

  const decrement = () => {
    if (count === 1) {
      setConfirmationOpen(true);
    } else {
      dispatch(cartActions.removeTicket(movieId));
    }
  };

  const deleteTicket = () => {
    dispatch(cartActions.deleteTicket(movieId));
    closeConfirmationModal();
  };

  return {
    count,
    increment,
    decrement,
    deleteTicket,
    confirmationOpen,
    showConfirmationModal,
    closeConfirmationModal,
  };
};

export default useCart;
