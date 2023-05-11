import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import PhoneInput from "react-phone-number-input";
import "./phone-input.css"; // import your custom CSS file
import Select from "react-select";
import countryList from "react-select-country-list";
import { ordersController } from "../../services/coreApi";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import { store } from "../../store/store";
import { setProducts } from "../../store/slices/product-slice";
import { useClient } from "../../ClientContext";

const Checkout = () => {
  let cartTotalPrice = 0;
  const { client, setClient } = useClient();
  const [clientState, setClientState] = useState(null);
  const [phoneNumber, setphoneNumber] = useState("");
  const dispatch = useDispatch();
  const [formFields, setformFields] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    additionalInfo: "",
  });
  const [country, setCountry] = useState("");
  const [countryLabel, setCountryLabel] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();
  useEffect(() => {
    setClientState((prevState) => ({
      ...prevState,
      firstname: client?.data?.firstname,
      lastname: client?.data?.lastname,
      phone: client?.data?.phone,
    }));
    setformFields((prevState) => ({
      ...prevState,
      firstname: client?.data?.firstname,
      lastname: client?.data?.lastname,
    }));
    setphoneNumber(client?.data?.phone);
  }, [client]);
  const ItemsProd = [
    {
      // id: "price_1MxYsTEXYQfbBZFawbRuVC62",
      // id: "price_1N5oKzEXYQfbBZFaGKsCc1PT",
      id: "price_1N5oSsEXYQfbBZFa8xq9s86B",
      // id:"price_1N5odGEXYQfbBZFaWWKE00D9",
      quantity: 1,
    },
    {
      // id: "price_1MxYsTEXYQfbBZFawbRuVC62",
      // id: "price_1N5oKzEXYQfbBZFaGKsCc1PT",
      // id: "price_1N5oSsEXYQfbBZFa8xq9s86B",
      id: "price_1N5odGEXYQfbBZFaWWKE00D9",
      quantity: 2,
    },
    // {},
  ];
  const countryChangeHandler = (value) => {
    setCountry(value);
    setCountryLabel(value.label);
  };

  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  const handleChange = (text) => (e) => {
    setformFields({ ...formFields, [text]: e.target.value });
  };
  const checkout = async () => {
    if (!client) {
      navigate("/login");
    } else {
      let data = {
        orderItems: cartItems.map((item) => ({
          _id: item._id,
          name: item.name,
          image: item.image[0],
          price:
            getDiscountPrice(item.price, item.discount)?.toFixed(2) ||
            item.price.toFixed(2),
          variation: {
            color: item.selectedProductColor,
            size: item.selectedProductSize,
            quantity: item.quantity,
          },
        })),
        shippingAddress: {
          fullName: formFields.firstname + " " + formFields.lastname,
          address: formFields.address,
          city: formFields.city,
          postalCode: formFields.postalCode,
          country: countryLabel,
        },
        additionalInfo: formFields.additionalInfo,
        totalPrice: cartTotalPrice.toFixed(2),
        id: client.data._id,
      };
      let stripeItems = cartItems.map((item) => ({
        id: item.priceId,
        quantity: item.quantity,
      }));
      await fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: stripeItems, data: data }),
        // body: JSON.stringify({ items: ItemsProd }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.url) {
            console.log(response.url);
            window.location.assign(response.url); // Forwarding user to Stripe
            dispatch(deleteAllFromCart());
          }
        });
    }
  };
  const addOrder = async () => {
    console.log(cartItems);
    let data = {
      orderItems: cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        image: item.image[0],
        price:
          getDiscountPrice(item.price, item.discount)?.toFixed(2) ||
          item.price.toFixed(2),
        variation: {
          color: item.selectedProductColor,
          size: item.selectedProductSize,
          quantity: item.quantity,
        },
      })),
      shippingAddress: {
        fullName: formFields.firstname + " " + formFields.lastname,
        address: formFields.address,
        city: formFields.city,
        postalCode: formFields.postalCode,
        country: countryLabel,
      },
      additionalInfo: formFields.additionalInfo,
      totalPrice: cartTotalPrice.toFixed(2),
    };
    console.log(data);
    const res = await ordersController.addOrder(data);
    console.log(res);
    if (res.status === 201) {
      dispatch(deleteAllFromCart());
      store.dispatch(setProducts(res.data.products));
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input
                            type="text"
                            onChange={handleChange("firstname")}
                            value={formFields.firstname || ""}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input
                            type="text"
                            onChange={handleChange("lastname")}
                            value={formFields.lastname || ""}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <Select
                            options={options}
                            value={country}
                            onChange={countryChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name if possible"
                            type="text"
                            onChange={handleChange("address")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" onChange={handleChange("city")} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input
                            type="text"
                            onChange={handleChange("postalCode")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          {/* <input type="text" /> */}
                          <PhoneInput
                            placeholder="Enter phone number"
                            name="phone"
                            value={phoneNumber}
                            onChange={setphoneNumber}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                          onChange={handleChange("additionalInfo")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    {/* <div className="place-order mt-25">
                      <button className="btn-hover" onClick={addOrder}>
                        Place Order
                      </button>
                    </div> */}
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={checkout}>
                        Pay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
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

export default Checkout;
