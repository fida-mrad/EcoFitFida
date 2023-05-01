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
  let cartTotalPrice = 0;
  const client = useClient();
  const navigate = useNavigate();
  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const [orders, setOrders] = useState([]);
  const getProducts = async () => {
    const res = await ordersController.getOrdersByClient();
    console.log(res);
    if (res.status === 200) {
      console.log("Orders : ");
      console.log(res.data);
      setOrders(res.data);
    }
  };
  useEffect(() => {
    if (client != null && client.status > 400) {
      console.log("not logged in");
      navigate("/");
    } else {
      console.log("Logged In");
    }
    getProducts();
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
                <h3 className="cart-page-title">Your Orders :</h3>
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
                                                src={
                                                  process.env.PUBLIC_URL +
                                                  item.image
                                                }
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
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Proceed to Checkout
                      </Link>
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
