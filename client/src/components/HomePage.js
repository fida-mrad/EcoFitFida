import React from "react";
import { authClientApi } from "../Services/Api";

function MyLink(props) {
  const handleClick = (event) => {
    event.preventDefault(); // prevent the default link behavior
    props.onClick(); // call the onClick function passed as a prop
  };

  return (
    <a href="#" onClick={handleClick}>
      {props.children}
    </a>
  );
}
class HomePage extends React.Component {
  logoutClient = async () => {
    let res = await authClientApi.logout();
  };

  render() {
    return (
      <div className="MainDiv">
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
                              <i
                                className="fa fa-sign-in"
                                aria-hidden="true"
                              ></i>
                              Sign In
                            </a>
                          </li>
                          <li>
                            <a href="/signup">
                              <i
                                className="fa fa-user-plus"
                                aria-hidden="true"
                              ></i>
                              Register
                            </a>
                          </li>
                          <li>
                            {/* <a> */}
                            <MyLink onClick={this.logoutClient}>Logout</MyLink>
                            <i
                              className="fa fa-sign-out"
                              aria-hidden="true"
                            ></i>
                            {/* </a> */}
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
                    <a href="#">
                      Eco<span>Fit</span>
                    </a>
                  </div>
                  <nav className="navbar">
                    <ul className="navbar_menu">
                      <li>
                        <a href="#">home</a>
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
                        <a href="#">
                          <i className="fa fa-user" aria-hidden="true"></i>
                          {/* UserName */}
                        </a>
                      </li>
                      {/* <li className="checkout"> */}
                      <li>
                        <a href="#">
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>
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
        <div className="fs_menu_overlay"></div>
        <div className="hamburger_menu">
          <div className="hamburger_close">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
          <div className="hamburger_menu_content text-right">
            <ul className="menu_top_nav">
              <li className="menu_item has-children">
                <a href="#">
                  usd
                  <i className="fa fa-angle-down"></i>
                </a>
                <ul className="menu_selection">
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
              <li className="menu_item has-children">
                <a href="#">
                  English
                  <i className="fa fa-angle-down"></i>
                </a>
                <ul className="menu_selection">
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
              <li className="menu_item has-children">
                <a href="#">
                  My Account
                  <i className="fa fa-angle-down"></i>
                </a>
                <ul className="menu_selection">
                  <li>
                    <a href="#">
                      <i className="fa fa-sign-in" aria-hidden="true"></i>Sign
                      In
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-user-plus" aria-hidden="true"></i>
                      Register
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu_item">
                <a href="#">home</a>
              </li>
              <li className="menu_item">
                <a href="#">shop</a>
              </li>
              <li className="menu_item">
                <a href="#">promotion</a>
              </li>
              <li className="menu_item">
                <a href="#">pages</a>
              </li>
              <li className="menu_item">
                <a href="#">blog</a>
              </li>
              <li className="menu_item">
                <a href="#">contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="main_slider"
          style={{ backgroundImage: "url(assets/images/slider_1.jpg)" }}
        >
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content">
                  <h6>Spring / Summer Collection 2021</h6>
                  <h1>Get up to 30% Off New Arrivals</h1>
                  <div className="red_button shop_now_button">
                    <a href="#">shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="banner">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: "url(assets/images/banner_1.jpg)" }}
                >
                  <div className="banner_category">
                    <a href="#">women's</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: "url(assets/images/banner_2.jpg)" }}
                >
                  <div className="banner_category">
                    <a href="#">accessories's</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: "url(assets/images/banner_3.jpg)" }}
                >
                  <div className="banner_category">
                    <a href="#">men's</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="new_arrivals">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title new_arrivals_title">
                  <h2>New Arrivals</h2>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col text-center">
                <div className="new_arrivals_sorting">
                  <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                    <li
                      className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked"
                      data-filter="*"
                    >
                      all
                    </li>
                    <li
                      className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center"
                      data-filter=".women"
                    >
                      women's
                    </li>
                    <li
                      className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center"
                      data-filter=".accessories"
                    >
                      accessories
                    </li>
                    <li
                      className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center"
                      data-filter=".men"
                    >
                      men's
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div
                  className="product-grid"
                  data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'
                >
                  <div className="product-item men">
                    <div className="product discount product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_1.png" alt="" />
                      </div>
                      <div className="favorite favorite_left"></div>
                      <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                        <span>-$20</span>
                      </div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">
                            Fujifilm X100T 16 MP Digital Camera (Silver)
                          </a>
                        </h6>
                        <div className="product_price">
                          $520.00<span>$590.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item women">
                    <div className="product product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_2.png" alt="" />
                      </div>
                      <div className="favorite"></div>
                      <div className="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center">
                        <span>new</span>
                      </div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">
                            Samsung CF591 Series Curved 27-Inch FHD Monitor
                          </a>
                        </h6>
                        <div className="product_price">$610.00</div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item women">
                    <div className="product product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_3.png" alt="" />
                      </div>
                      <div className="favorite"></div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">
                            Blue Yeti USB Microphone Blackout Edition
                          </a>
                        </h6>
                        <div className="product_price">$120.00</div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item accessories">
                    <div className="product product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_4.png" alt="" />
                      </div>
                      <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                        <span>sale</span>
                      </div>
                      <div className="favorite favorite_left"></div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">
                            DYMO LabelWriter 450 Turbo Thermal Label Printer
                          </a>
                        </h6>
                        <div className="product_price">$410.00</div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item women men">
                    <div className="product product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_5.png" alt="" />
                      </div>
                      <div className="favorite"></div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">Pryma Headphones, Rose Gold & Grey</a>
                        </h6>
                        <div className="product_price">$180.00</div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item accessories">
                    <div className="product discount product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_6.png" alt="" />
                      </div>
                      <div className="favorite favorite_left"></div>
                      <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                        <span>-$20</span>
                      </div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="##">
                            Fujifilm X100T 16 MP Digital Camera (Silver)
                          </a>
                        </h6>
                        <div className="product_price">
                          $520.00<span>$590.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item women">
                    <div className="product product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_7.png" alt="" />
                      </div>
                      <div className="favorite"></div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">
                            Samsung CF591 Series Curved 27-Inch FHD Monitor
                          </a>
                        </h6>
                        <div className="product_price">$610.00</div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item accessories">
                    <div className="product product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_8.png" alt="" />
                      </div>
                      <div className="favorite"></div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">
                            Blue Yeti USB Microphone Blackout Edition
                          </a>
                        </h6>
                        <div className="product_price">$120.00</div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item men">
                    <div className="product product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_9.png" alt="" />
                      </div>
                      <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                        <span>sale</span>
                      </div>
                      <div className="favorite favorite_left"></div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">
                            DYMO LabelWriter 450 Turbo Thermal Label Printer
                          </a>
                        </h6>
                        <div className="product_price">$410.00</div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>

                  <div className="product-item men">
                    <div className="product product_filter">
                      <div className="product_image">
                        <img src="assets/images/product_10.png" alt="" />
                      </div>
                      <div className="favorite"></div>
                      <div className="product_info">
                        <h6 className="product_name">
                          <a href="#">Pryma Headphones, Rose Gold & Grey</a>
                        </h6>
                        <div className="product_price">$180.00</div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button">
                      <a href="#">add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="deal_ofthe_week">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="deal_ofthe_week_img">
                  <img src="assets/images/deal_ofthe_week.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 text-right deal_ofthe_week_col">
                <div className="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
                  <div className="section_title">
                    <h2>Deal Of The Week</h2>
                  </div>

                  <div className="red_button deal_ofthe_week_button">
                    <a href="#">shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="best_sellers">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title new_arrivals_title">
                  <h2>Best Sellers</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="product_slider_container">
                  <div className="owl-carousel owl-theme product_slider">
                    <div className="owl-item product_slider_item">
                      <div className="product-item">
                        <div className="product discount">
                          <div className="product_image">
                            <img src="assets/images/product_1.png" alt="" />
                          </div>
                          <div className="favorite favorite_left"></div>
                          <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                            <span>-$20</span>
                          </div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">
                                Fujifilm X100T 16 MP Digital Camera (Silver)
                              </a>
                            </h6>
                            <div className="product_price">
                              $520.00<span>$590.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item women">
                        <div className="product">
                          <div className="product_image">
                            <img src="assets/images/product_2.png" alt="" />
                          </div>
                          <div className="favorite"></div>
                          <div className="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center">
                            <span>new</span>
                          </div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">
                                Samsung CF591 Series Curved 27-Inch FHD Monitor
                              </a>
                            </h6>
                            <div className="product_price">$610.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item women">
                        <div className="product">
                          <div className="product_image">
                            <img src="assets/images/product_3.png" alt="" />
                          </div>
                          <div className="favorite"></div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">
                                Blue Yeti USB Microphone Blackout Edition
                              </a>
                            </h6>
                            <div className="product_price">$120.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item accessories">
                        <div className="product">
                          <div className="product_image">
                            <img src="assets/images/product_4.png" alt="" />
                          </div>
                          <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                            <span>sale</span>
                          </div>
                          <div className="favorite favorite_left"></div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">
                                DYMO LabelWriter 450 Turbo Thermal Label Printer
                              </a>
                            </h6>
                            <div className="product_price">$410.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item women men">
                        <div className="product">
                          <div className="product_image">
                            <img src="assets/images/product_5.png" alt="" />
                          </div>
                          <div className="favorite"></div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">Pryma Headphones, Rose Gold & Grey</a>
                            </h6>
                            <div className="product_price">$180.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item accessories">
                        <div className="product discount">
                          <div className="product_image">
                            <img src="assets/images/product_6.png" alt="" />
                          </div>
                          <div className="favorite favorite_left"></div>
                          <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                            <span>-$20</span>
                          </div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">
                                Fujifilm X100T 16 MP Digital Camera (Silver)
                              </a>
                            </h6>
                            <div className="product_price">
                              $520.00<span>$590.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item women">
                        <div className="product">
                          <div className="product_image">
                            <img src="assets/images/product_7.png" alt="" />
                          </div>
                          <div className="favorite"></div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">
                                Samsung CF591 Series Curved 27-Inch FHD Monitor
                              </a>
                            </h6>
                            <div className="product_price">$610.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item accessories">
                        <div className="product">
                          <div className="product_image">
                            <img src="assets/images/product_8.png" alt="" />
                          </div>
                          <div className="favorite"></div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">
                                Blue Yeti USB Microphone Blackout Edition
                              </a>
                            </h6>
                            <div className="product_price">$120.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item men">
                        <div className="product">
                          <div className="product_image">
                            <img src="assets/images/product_9.png" alt="" />
                          </div>
                          <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                            <span>sale</span>
                          </div>
                          <div className="favorite favorite_left"></div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">
                                DYMO LabelWriter 450 Turbo Thermal Label Printer
                              </a>
                            </h6>
                            <div className="product_price">$410.00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="owl-item product_slider_item">
                      <div className="product-item men">
                        <div className="product">
                          <div className="product_image">
                            <img src="assets/images/product_10.png" alt="" />
                          </div>
                          <div className="favorite"></div>
                          <div className="product_info">
                            <h6 className="product_name">
                              <a href="#">Pryma Headphones, Rose Gold & Grey</a>
                            </h6>
                            <div className="product_price">$180.00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="product_slider_nav_left product_slider_nav d-flex align-items-center justify-content-center flex-column">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  </div>
                  <div className="product_slider_nav_right product_slider_nav d-flex align-items-center justify-content-center flex-column">
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="benefit">
          <div className="container">
            <div className="row benefit_row">
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon">
                    <i className="fa fa-truck" aria-hidden="true"></i>
                  </div>
                  <div className="benefit_content">
                    <h6>free shipping</h6>
                    <p>Suffered Alteration in Some Form</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon">
                    <i className="fa fa-money" aria-hidden="true"></i>
                  </div>
                  <div className="benefit_content">
                    <h6>cach on delivery</h6>
                    <p>The Internet Tend To Repeat</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon">
                    <i className="fa fa-undo" aria-hidden="true"></i>
                  </div>
                  <div className="benefit_content">
                    <h6>45 days return</h6>
                    <p>Making it Look Like Readable</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                  </div>
                  <div className="benefit_content">
                    <h6>opening all week</h6>
                    <p>8AM - 09PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blogs">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title">
                  <h2>Latest Blogs</h2>
                </div>
              </div>
            </div>
            <div className="row blogs_container">
              <div className="col-lg-4 blog_item_col">
                <div className="blog_item">
                  <div
                    className="blog_background"
                    style={{ backgroundImage: "url(assets/images/blog_1.jpg)" }}
                  ></div>
                  <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                    <h4 className="blog_title">
                      Here are the trends I see coming this fall
                    </h4>
                    <span className="blog_meta">by admin | dec 01, 2021</span>
                    <a className="blog_more" href="#">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 blog_item_col">
                <div className="blog_item">
                  <div
                    className="blog_background"
                    style={{ backgroundImage: "url(assets/images/blog_2.jpg)" }}
                  ></div>
                  <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                    <h4 className="blog_title">
                      Here are the trends I see coming this fall
                    </h4>
                    <span className="blog_meta">by admin | dec 01, 2021</span>
                    <a className="blog_more" href="#">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 blog_item_col">
                <div className="blog_item">
                  <div
                    className="blog_background"
                    style={{ backgroundImage: "url(assets/images/blog_3.jpg)" }}
                  ></div>
                  <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                    <h4 className="blog_title">
                      Here are the trends I see coming this fall
                    </h4>
                    <span className="blog_meta">by admin | dec 01, 2021</span>
                    <a className="blog_more" href="#">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                  <h4>Newsletter</h4>
                  <p>
                    Subscribe to our newsletter and get 20% off your first
                    purchase
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <form action="post">
                  <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                    <input
                      id="newsletter_email"
                      type="email"
                      placeholder="Your email"
                      required="required"
                      data-error="Valid email is required."
                    />
                    <button
                      id="newsletter_submit"
                      type="submit"
                      className="newsletter_submit_btn trans_300"
                      value="Submit"
                    >
                      subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
                  <ul className="footer_nav">
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">FAQs</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-skype" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-pinterest" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="footer_nav_container">
                  <div className="cr">
                    ©2021 All Rights Reserverd. Made with{" "}
                    <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
                    <a href="#">Jassa</a> &amp; Loved by{" "}
                    <a href="https://therichpost.com">Jassa</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default HomePage;
