import React, { useEffect, useState } from "react";
import "./cartstyle.css";
import { MdDelete } from "react-icons/md";
import { BsCartFill } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  removeSingleItem,
  emptycart,
} from "../redux/features/CartSlice";
import toast from "react-hot-toast";

const CartDetails = () => {
  const { cart } = useSelector((state) => state.allCart);
  console.log(cart);

  const [totalprice, settotalprice] = useState(0);
  const [totalQuantity, settotalQuantity] = useState(0);

  const dispatch = useDispatch();

  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  const handleDecrement = (e) => {
    dispatch(removeSingleItem(e));
  };

  const handleDelete = (e) => {
    dispatch(removeFromCart(e));
    toast.success("Item removed from your cart");
  };

  const emptyCart = () => {
    dispatch(emptycart());
    toast.success("Your cart is empty");
  };

  const total = () => {
    let Tprice = 0;
    cart.map((ele, idx) => {
      Tprice = ele.price * ele.qnty + Tprice;
      settotalprice(Tprice);
    });
  };

  const totalQnty = () => {
    let T_qnty = 0;
    cart.map((ele, idx) => {
      T_qnty = ele.qnty + T_qnty;
      settotalQuantity(T_qnty);
    });
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    totalQnty();
  }, [totalQnty]);

  return (
    <>
      <div className="m-0 justify-content-center row">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            {/* //card-header */}
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5
                  className="text-white m-0
              "
                >
                  Cart Calculation
                </h5>
                {cart.length > 0 ? (
                  <button
                    onClick={emptyCart}
                    className="btn btn-danger mt-0 btn-sm"
                  >
                    <span>
                      <MdDelete size={20} />
                    </span>{" "}
                    Empty cart
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* card-body */}
            <div className="card-body p-0">
              {cart.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <BsCartFill size={40} color="light-gray" />
                          <p>Your cart is empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th className="text-right">
                        <span className="amount" id="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((data, idx) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <button
                                onClick={() => handleDelete(data.id)}
                                className="prdct-delete"
                              >
                                <MdDelete size={20} />
                              </button>
                            </td>
                            <td>
                              <div className="product-img">
                                <img src={data.imgdata} alt="item image" />
                              </div>
                            </td>
                            <td>
                              <div className="product-name">
                                <p>{data.dish}</p>
                              </div>
                            </td>
                            <td>{data.price}</td>
                            <td>
                              <div className="prdct-qty-container">
                                <button
                                  onClick={
                                    data.qnty <= 1
                                      ? () => handleDelete(data.id)
                                      : () => handleDecrement(data)
                                  }
                                  className="prdct-qty-btn"
                                  type="button"
                                >
                                  <FaMinus />
                                </button>
                                <input
                                  className="qty-input-box"
                                  value={data.qnty}
                                  disabled
                                  type="text"
                                  name=""
                                  id=""
                                />
                                <button
                                  onClick={() => handleIncrement(data)}
                                  className="prdct-qty-btn"
                                  type="button"
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </td>
                            <td className="text-right">
                              {data.qnty * data.price}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Items in cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalQuantity}</span>
                      </th>
                      <th className="text-right">
                        Total Price <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalprice}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
