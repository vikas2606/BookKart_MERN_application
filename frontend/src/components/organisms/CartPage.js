import React, { useEffect,  useRef } from "react";
import TableHeader from "../molecules/TableHeader";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ConvertToINR from "../atoms/ConvertToINR";
import Skeleton from "@mui/material/Skeleton";
import Error from "../molecules/Error";
import { CartList } from "../store/actions/cartActions";
import {
  removeCartAction,
  cartDecrementAction,
  cartIncrementAction,
} from "../store/actions/cartActions";

function CartPage({
  cart,
  dispatch,
  incrementCart,
  decrementCart,
  removeFromCart,
  addToCart,
  cartList,
}) {
  const {  cart_create_success } =
    addToCart;
  const {
    cart_increment_loading,
    
    cart_increment_success,
  } = incrementCart;
  const {
    cart_decrement_loading,
    
    cart_decrement_success,
  } = decrementCart;
  const {  cart_delete_success } =
    removeFromCart;

  const { cart_list_loading, cart_list_error } = cartList;

  const tableRef = useRef(null);

  const headers = ["Title", "Quantity", "Price", ""];

  useEffect(() => {
    dispatch(CartList());
  }, [cart_increment_success, cart_decrement_success, cart_delete_success]);

  useEffect(() => {
    if (tableRef.current) {
      const numberOfRows = tableRef.current.rows.length - 1;
      dispatch({ type: "UPDATE_NUM_ROWS", payload: numberOfRows });
    }
  }, [cart_create_success, cart]);

  const incrementHandler = (bookId) => {
    dispatch(cartIncrementAction(bookId));
  };

  const decrementHandler = (bookId) => {
    dispatch(cartDecrementAction(bookId));
  };

  const removeHandler = (bookId) => {
    dispatch(removeCartAction(bookId));
  };

  if (cart_list_loading || cart_increment_loading || cart_decrement_loading) {
    const numSkeletons = 5;
    const skeletons = Array.from({ length: numSkeletons }, (_, index) => (
      <tr>
        {headers.map((header) => (
          <td key={header}>
            <Skeleton height={80} sx={{ bgcolor: "grey.700" }} />
          </td>
        ))}
      </tr>
    ));

    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 my-4">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-800">
          <TableHeader headers={headers} />
          <tbody>{skeletons}</tbody>
        </table>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-4 my-4 first-letter:bg-transparent ">
        <Error
          code={<ProductionQuantityLimitsIcon sx={{ fontSize: 100 }} />}
          message={"Your cart is Empty!"}
        />
      </div>
    );
  }

  if (!cart || cart_list_error) {
    return (
      <div className="mx-4 my-4 first-letter:bg-transparent ">
        <Error code={500} message={"Internal Server Error"} />
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 my-4">
        <table
          ref={tableRef}
          className="w-full text-sm text-left text-gray-400 bg-gray-800 gap-4"
        >
          <TableHeader headers={headers} />
          <tbody className="gap-4">
            {cart.items.map((item) => (
              <tr
                key={item._id}
                className="bg-gray-800 border-b border-gray-700 "
              >
                <td>{item.book.title}</td>
                <td className="inline-flex rounded-md shadow-sm">
                  <button
                    className="btn-group-left"
                    onClick={() => {
                      decrementHandler(item.book._id);
                    }}
                  >
                    <RemoveIcon />
                  </button>
                  <span className="disbled-input">{item.quantity}</span>
                  <button
                    className="btn-group-right"
                    onClick={() => {
                      incrementHandler(item.book._id);
                    }}
                  >
                    <AddIcon />
                  </button>
                </td>

                <td>{ConvertToINR(item.book.price)}</td>
                <td>
                  <button
                    className="text-red-600 font-bold"
                    onClick={() => {
                      removeHandler(item.book._id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mx-4 my-4 justify-end gap-4">
        <p className="text-lg font-medium text-white">
          Sub Total:
          <span className="text-green-400">
            {ConvertToINR(cart.totalPrice)}
          </span>
        </p>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={incrementHandler}
        >
          Buy now
        </button>
      </div>
    </div>
  );
}

export default CartPage;
