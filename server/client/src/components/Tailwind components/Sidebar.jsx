import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "./CartItem";
import { SidebarContext } from "../../context/SidebarProvider";
import { CartContext } from "../../context/Cart";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemQuantity } = useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } "w-full bg-white z-50 fixed top-12 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300  px-4 lg:px-[35px]"`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemQuantity})
        </div>
        <div
          onClick={handleClose}
          className="cursor-poniter w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((p) => {
          return <CartItem p={p} key={p._id} />;
        })}
      </div>
      {cart.length > 0 ? (
        <>
          <div className="flex flex-col gap-y-3  mt-4">
            <div className="flex w-full justify-between items-center">
              {/* total */}
              <div className="font-semibold">
                <span className="mr-2">Subtotal:</span> ${" "}
                {parseFloat(total).toFixed(2)}
              </div>
              {/* clear cart icon */}
              <div
                onClick={clearCart}
                className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
              >
                <FiTrash2 />
              </div>
            </div>
            <button onClick={handleClose}>
              <Link
                to="/"
                className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium"
              >
                Back To Shop
              </Link>
            </button>
            <Link
              to={"/cart"}
              className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium"
            >
              View cart
            </Link>

            <Link
              to={"/cart"}
              className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
            >
              Checkout
            </Link>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Sidebar;
