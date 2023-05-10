import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { authClientApi } from "../../services/authClientApi";
import { useClient } from "../../ClientContext";
import { useEffect, useState } from "react";

const IconGroup = ({ iconWhiteClass }) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { client, setClient } = useClient();
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const [clientState, setClientState] = useState(null);
  useEffect(() => {
    if (client != null && client.status === 200) {
      setClientState((prevState) => ({
        ...prevState,
        firstname: client?.data.firstname,
        lastname: client?.data.lastname,
      }));
    }
  }, [client]);
  let logoutClient = async (event) => {
    await authClientApi.logout();
    setClient(null);
  };
  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            {!clientState && (
              <li>
                <Link to={process.env.PUBLIC_URL + "/login"}>Login</Link>
              </li>
            )}
            {!clientState && (
              <li>
                <Link to={process.env.PUBLIC_URL + "/register"}>Sign Up</Link>
              </li>
            )}
            {clientState && (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    my account
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/myOrders"}>
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={logoutClient}
                    to={process.env.PUBLIC_URL + "/login"}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      {/* <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/myOrders"}>
          <i className="pe-7s-cash" />
        </Link>
      </div> */}
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
