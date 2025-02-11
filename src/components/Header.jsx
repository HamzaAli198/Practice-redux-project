import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { cart } = useSelector((state) => state.allCart);
  // console.log("cart", cart);

  return (
    <>
      <Navbar style={{ height: "60px", background: "black", color: "white" }}>
        <Container>
          <NavLink to={"/"} className="text-decoration-none text-light mx-2">
            <h3 className="text-light">E-finder</h3>
          </NavLink>
          <NavLink
            to={"/cart"}
            className="text-decoration-none text-light mx-2"
          >
            <div id="ex4">
              <span className="p1 fa-2x has-badge" data-count={cart.length}>
                <FaShoppingCart size={30} />
              </span>
            </div>
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
