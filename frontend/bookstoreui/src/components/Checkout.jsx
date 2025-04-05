import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, selectCartTotalItems } from "../store/slices/cartSlices";
import CheckoutForm from "./ui/CheckoutForm";
import Header from './ui/Header'
import ProcessPayment from "./ui/ProcessPayment";
import PaymentSuccess from "./ui/PaymentSucess";
import CheckoutFail from "./ui/CheckoutFail";
import { selectFullCartTotalPrice } from "../store/slices/fullCartSlices";

function Checkout() {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectFullCartTotalPrice);

  const [ success, setSuccess ] = useState(false);
  const [ processing, setProcessing ] = useState(false);
  const [ failure, setFailure ] = useState({ failure: false, reason: '', critical: false });
  const [ transaction, setTransaction ] = useState({ items: 0, amount: 0 });

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
    }
  }, [success, dispatch, clearCart]);

  useEffect(() => {

    // Cart must have at least 1 item for checkout.
    if (totalItems < 1 && !success) navigate('/');
  }, [totalItems, navigate, success]);

  const checkoutSuccess = useCallback((items, amount) => {
    setTransaction({ items, amount });
    setProcessing(false);
    setSuccess(true);
  }, [setSuccess, setProcessing, setTransaction]);

  const paymentProcessing = useCallback((status) => {
    setProcessing(status);
  }, [setProcessing]);

  const handleFailure = useCallback((failure, reason, critical = false) => {
    setFailure({ failure, reason, critical });
  }, [setFailure]);

  // Cart must have at least 1 item for checkout.
  if (totalItems < 1 && !success) return null;

  return (
    <>
      <Header />
      <main className="flex justify-center items-center px-4 py-2">
        { (!success && !processing && !failure.critical) &&
          <CheckoutForm
            failure={failure}
            checkoutSuccess={checkoutSuccess}
            paymentProcessing={paymentProcessing}
            handleFailure={handleFailure}
          />
        }
        { processing &&
          <ProcessPayment totalPrice={totalPrice} />
        }
        { success &&
          <PaymentSuccess
            totalItems={transaction.items}
            totalPrice={transaction.amount}
          />
        }
        { failure.critical &&
          <CheckoutFail failure={failure} />
        }
      </main>
    </>
  );
}

export default Checkout;