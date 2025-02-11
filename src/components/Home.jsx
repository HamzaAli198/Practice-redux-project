import React, { useState } from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardData from "./CardData";
import { addToCart } from "../redux/features/CartSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  // console.log(CardData);

  const [cartData, setcartData] = useState(CardData);
  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(addToCart(e));
  };

  return (
    <>
      <section className="container mt-4 item_section"></section>
      <h2 className="px-4" style={{ fontWeight: "400" }}>
        Restaurants in E-FINDER
      </h2>
      <div className="row mt-2 d-flex justify-content-around align-items-center">
        {cartData.map((card, idx) => {
          return (
            <>
              <Card
                className="hove mb-4"
                style={{ width: "22rem", border: "none" }}
              >
                <Card.Img variant="top" className="cd" src={card.imgdata} />
                <div className="card_body">
                  <div className="upper_data d-flex justify-content-between align-items-center">
                    <h4 className="mt-2">{card.dish}</h4>
                    <span>{card.rating}&nbsp;★</span>
                  </div>

                  <div className="lower_data d-flex justify-content-between">
                    <h5>{card.address}</h5>
                    <span>{card.price}</span>
                  </div>

                  <div className="extra"></div>

                  <div className="last_data d-flex justify-content-between align-items-center">
                    <img className="limg" alt="" src={card.arrimg} />
                    <Button
                      style={{
                        background: "#ff3054db",
                        border: "none",
                        width: "150px",
                      }}
                      variant="outline-light"
                      className="mt-2 mb-2"
                      onClick={() => send(card)}
                    >
                      Add To Cart
                    </Button>
                    <img className="laimg" alt="" src={card.delimg} />
                  </div>
                </div>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
