import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice, cartItemStock } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../store/slices/cart-slice";
import { ordersController } from "../../services/coreApi";
import { useClient } from "../../ClientContext";
import { Button } from "react-bootstrap";

const MyOrders = () => {
  const { client, setClient } = useClient();
  const navigate = useNavigate();
  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const [orders, setOrders] = useState([]);
  const [clientState, setClientState] = useState(null);

  const getOrders = async () => {
    const res = await ordersController.getOrdersByClient();
    console.log(res);
    if (res.status === 200) {
      console.log("Orders : ");
      console.log(res.data);
      setOrders(res.data);
    }
  };
  useEffect(() => {
    if (client == null) {
      navigate("/login");
    } else {
      // if (client != null && client.status > 400) {
      if (client.status > 400) {
        console.log("not logged in");
        navigate("/login");
      } else {
        setClientState((prevState) => ({
          ...prevState,
          firstname: client?.data.firstname,
          lastname: client?.data.lastname,
          username: client?.data.username,
        }));
        console.log("Logged In");
        getOrders();
      }
    }
  }, [client]);
  const cancelOrder = async (id) => {
    const res = await ordersController.cancelOrder(id);
    console.log(res);
    if (res.status === 200) {
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    }
  };

  const currency = useSelector((state) => state.currency);

  return (
    <Fragment>
      <SEO titleTemplate="My Orders" description="My Orders EcoFit." />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Orders", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {orders && orders.length >= 1 ? (
              <Fragment>
                {/* <h3 className="cart-page-title">Hello Your Orders :</h3> */}
                <h3 className="cart-page-title">
                  Hello {clientState?.firstname} Your Orders :
                </h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Order</th>
                            {/* <th>Id</th>
                            <th>Total Price</th>
                            <th>Date</th>
                            <th>Products</th> */}
                            <th>Products</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => {
                            const formattedDate = new Date(
                              order.createdAt
                            ).toLocaleDateString();
                            return (
                              //   <>
                              <tr key={index}>
                                <td>
                                  Order ID : {order._id} {"\n"} Date :{" "}
                                  {formattedDate} {"\n"} Total :{" "}
                                  {order.totalPrice}
                                </td>
                                {/* <td>{order.totalPrice}</td>
                                <td>{order.createdAt}</td> */}
                                <td>
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Qty</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.orderItems.map((item, key) => {
                                        return (
                                          <tr key={key}>
                                            <td className="product-thumbnail">
                                              <img
                                                className="img-fluid"
                                                // src={
                                                //   process.env.PUBLIC_URL +
                                                //   item.image
                                                // }
                                                src={"http://localhost:8000/images/"+item.image}
                                                alt=""
                                              />
                                            </td>

                                            <td className="product-name">
                                              {item.name}
                                            </td>

                                            <td>{item.variation.color}</td>
                                            <td>{item.variation.size}</td>
                                            <td className="product-quantity">
                                              {item.variation.quantity}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <Button
                                    className="mr-10"
                                    variant="danger"
                                    onClick={() => cancelOrder(order._id)}
                                  >
                                    Cancel
                                  </Button>
                                </td>
                              </tr>
                              //   </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      {/* <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Clear Shopping Cart
                        </button>
                      </div> */}
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/checkout"}>
                          Proceed to Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No Orders
                      <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyOrders;
