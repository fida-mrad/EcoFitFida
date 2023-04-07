import { authClientApi } from "../Services/Api";
import React from 'react';


function NavBar() {
  let logoutClient = async (event) => {
    // event.preventDefault(); // prevent the default link behavior
    await authClientApi.logout();
  };
  return (
    <header className="header trans_300">
      <div className="top_nav">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="top_nav_left">Healthy Shopping</div>
            </div>
            <div className="col-md-6 text-right">
              <div className="top_nav_right">
                <ul className="top_nav_menu">
                  <li className="currency">
                    <a href="#">
                      usd
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <ul className="currency_selection">
                      <li>
                        <a href="#">cad</a>
                      </li>
                      <li>
                        <a href="#">aud</a>
                      </li>
                      <li>
                        <a href="#">eur</a>
                      </li>
                      <li>
                        <a href="#">gbp</a>
                      </li>
                    </ul>
                  </li>
                  <li className="language">
                    <a href="#">
                      English
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <ul className="language_selection">
                      <li>
                        <a href="#">French</a>
                      </li>
                      <li>
                        <a href="#">Italian</a>
                      </li>
                      <li>
                        <a href="#">German</a>
                      </li>
                      <li>
                        <a href="#">Spanish</a>
                      </li>
                    </ul>
                  </li>
                  <li className="account">
                    <a href="#">
                      My Account
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <ul className="account_selection">
                      <li>
                        <a href="/signin">
                          <i className="fa fa-sign-in-alt" aria-hidden="true"></i>
                          Sign In
                        </a>
                      </li>
                      <li>
                        <a href="/signup">
                          <i className="fa fa-user-plus" aria-hidden="true"></i>
                          Register
                        </a>
                      </li>
                      <li>
                        <a href="/signin" onClick={logoutClient}>
                        Logout
                        <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main_nav_container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-right">
              <div className="logo_container">
                <a href="/">
                  Eco<span>Fit</span>
                </a>
              </div>
              <nav className="navbar">
                <ul className="navbar_menu">
                  <li>
                    <a href="/">home</a>
                  </li>
                  <li>
                    <a href="#">shop</a>
                  </li>
                  <li>
                    <a href="#">promotion</a>
                  </li>
                  <li>
                    <a href="#">pages</a>
                  </li>
                  <li>
                    <a href="#">blog</a>
                  </li>
                  <li>
                    <a href="#">contact</a>
                  </li>
                </ul>
                <ul className="navbar_user">
                  <li>
                    <a href="#">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/account">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      {/* UserName */}
                    </a>
                  </li>
                  {/* <li className="checkout"> */}
                  <li>
                    <a href="/cart">
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                      {/* <span id="checkout_items" className="checkout_items">
                         2
                       </span> */}
                    </a>
                  </li>
                </ul>
                <div className="hamburger_container">
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
