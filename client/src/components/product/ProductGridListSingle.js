import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { calculateScore, getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  let currentDate = new Date();
  let createdAtDate = new Date(product.createdAt);
  let diffInDays = (currentDate - createdAtDate) / (1000 * 60 * 60 * 24);
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();
  let averageRating =
    product.reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0) / product.reviews.length;
  averageRating = Math.floor(averageRating);
  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product._id}>
            <img
              className="default-img"
              src={"http://localhost:8000/images/" + product.image[0]}
              alt=""
            />
            {product.image.length > 1 ? (
              <img
                className="hover-img"
                src={"http://localhost:8000/images/" + product.image[1]}
                alt=""
              />
            ) : (
              ""
            )}
          </Link>
          {product.discount || diffInDays < 3 ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {diffInDays < 3 ? <span className="purple">New</span> : ""}
              <span
                className={
                  calculateScore(product) === 2000
                    ? "green"
                    : calculateScore(product) < 2000 &&
                      calculateScore(product) > 400
                    ? "orange"
                    : "red"
                }
              >
                {calculateScore(product) / 200}
              </span>
            </div>
          ) : (
            <div className="product-img-badges">
              <span
                className={
                  calculateScore(product) === 2000
                    ? "green"
                    : calculateScore(product) < 2000 &&
                      calculateScore(product) > 400
                    ? "orange"
                    : "red"
                }
              >
                {calculateScore(product) / 200}
              </span>
            </div>
          )}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Buy now{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
                  Select Option
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product._id}>
              {product.name}
            </Link>
          </h3>
          {product.reviews.length > 0 && averageRating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={averageRating} />
            </div>
          ) : (
            ""
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + finalProductPrice}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + finalProductPrice} </span>
            )}
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link to={process.env.PUBLIC_URL + "/product/" + product._id}>
                  <img
                    className="default-img img-fluid"
                    src={"http://localhost:8000/images/" + product.image[0]}
                    alt=""
                  />
                  {product.image.length > 1 ? (
                    <img
                      className="hover-img img-fluid"
                      src={"http://localhost:8000/images/" + product.image[1]}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </Link>
                {product.discount || diffInDays < 3 ? (
                  <div className="product-img-badges">
                    {product.discount ? (
                      <span className="pink">-{product.discount}%</span>
                    ) : (
                      ""
                    )}
                    {diffInDays < 3 ? <span className="purple">New</span> : ""}
                    <span
                      className={
                        calculateScore(product) === 2000
                          ? "green"
                          : calculateScore(product) < 2000 &&
                            calculateScore(product) > 400
                          ? "orange"
                          : "red"
                      }
                    >
                      {calculateScore(product) / 200}
                    </span>
                  </div>
                ) : (
                  <div className="product-img-badges">
                    <span
                      className={
                        calculateScore(product) === 2000
                          ? "green"
                          : calculateScore(product) < 2000 &&
                            calculateScore(product) > 400
                          ? "orange"
                          : "red"
                      }
                    >
                      {calculateScore(product) / 200}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product/" + product._id}>
                  {product.name}
                </Link>
              </h3>
              <div className="product-list-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {currency.currencySymbol + finalDiscountedPrice}
                    </span>{" "}
                    <span className="old">
                      {currency.currencySymbol + finalProductPrice}
                    </span>
                  </Fragment>
                ) : (
                  <span>{currency.currencySymbol + finalProductPrice} </span>
                )}
              </div>
              {product.reviews.length > 0 && averageRating > 0 > 0 ? (
                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating ratingValue={averageRating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              {product.shortDescription ? (
                <p>{product.shortDescription}</p>
              ) : (
                ""
              )}

              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
                  {product.affiliateLink ? (
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {" "}
                      Buy now{" "}
                    </a>
                  ) : product.variation && product.variation.length >= 1 ? (
                    <Link
                      to={`${process.env.PUBLIC_URL}/product/${product._id}`}
                    >
                      Select Option
                    </Link>
                  ) : product.stock && product.stock > 0 ? (
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className={
                        cartItem !== undefined && cartItem.quantity > 0
                          ? "active"
                          : ""
                      }
                      disabled={cartItem !== undefined && cartItem.quantity > 0}
                      title={
                        cartItem !== undefined ? "Added to cart" : "Add to cart"
                      }
                    >
                      {" "}
                      <i className="pe-7s-cart"></i>{" "}
                      {cartItem !== undefined && cartItem.quantity > 0
                        ? "Added"
                        : "Add to cart"}
                    </button>
                  ) : (
                    <button disabled className="active">
                      Out of Stock
                    </button>
                  )}
                </div>

                <div className="shop-list-wishlist ml-10">
                  <button
                    className={wishlistItem !== undefined ? "active" : ""}
                    disabled={wishlistItem !== undefined}
                    title={
                      wishlistItem !== undefined
                        ? "Added to wishlist"
                        : "Add to wishlist"
                    }
                    onClick={() => dispatch(addToWishlist(product))}
                  >
                    <i className="pe-7s-like" />
                  </button>
                </div>
                <div className="shop-list-compare ml-10">
                  <button
                    className={compareItem !== undefined ? "active" : ""}
                    disabled={compareItem !== undefined}
                    title={
                      compareItem !== undefined
                        ? "Added to compare"
                        : "Add to compare"
                    }
                    onClick={() => dispatch(addToCompare(product))}
                  >
                    <i className="pe-7s-shuffle" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
