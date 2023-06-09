import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const url = window.location.href;
  const dispatch = useDispatch();
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation.length !== 0 ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation.length !== 0 ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation.length !== 0
      ? product.variation[0].size[0].stock
      : product.stock
  );
  useEffect(() => {
    setSelectedProductColor(
      product.variation.length !== 0 ? product.variation[0].color : ""
    );
    setSelectedProductSize(
      product.variation.length !== 0 ? product.variation[0].size[0].name : ""
    );
    setProductStock(
      product.variation.length !== 0
        ? product.variation[0].size[0].stock
        : product.stock
    );
  }, [product]);

  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );
  let averageRating =
    product.reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0) / product.reviews.length;
  averageRating = Math.floor(averageRating);
  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <br></br>
      <h4>
        <i class="far fa-registered"></i> {product.brand.brandname}
      </h4>
      <div className="product-details-price">
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
      {product.reviews.length > 0 && averageRating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={averageRating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.shortDescription}</p>
      </div>

      {product.variation.length !== 0 ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {product.affiliateLink ? (
        // <div className="pro-details-quality">
        //   <div className="pro-details-cart btn-hover ml-0">
        //     <a
        //       href={product.affiliateLink}
        //       rel="noopener noreferrer"
        //       target="_blank"
        //     >
        //       Buy Now
        //     </a>
        //   </div>
        // </div>
        <div className="pro-details-quality">
          <div
            className="pro-details-cart btn-hover"
            onClick={() => console.log("Buy Nom")}
          >
            {/* <a
            // href={product.affiliateLink}
            href="#!"
            rel="noopener noreferrer"
            target="_blank"
          > */}
            Buy Now ProductDescriptionInfo
            {/* </a> */}
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      ...product,
                      quantity: quantityCount,
                      selectedProductColor: selectedProductColor
                        ? selectedProductColor
                        : product.selectedProductColor
                        ? product.selectedProductColor
                        : null,
                      selectedProductSize: selectedProductSize
                        ? selectedProductSize
                        : product.selectedProductSize
                        ? product.selectedProductSize
                        : null,
                    })
                  )
                }
                disabled={productCartQty >= productStock}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
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
          <div className="pro-details-compare">
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
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          {/* <li>
            <a href="#!">
              <i className="fa fa-facebook" />
            </a>
          </li> */}
          <li>
            <FacebookShareButton
              // url={url}  maybe after deploy
              url="https://example.com/blogpost"
              quote="Check out this awesome Product on EcoFit!"
              hashtag="#EcoFit"
              socialMedia="facebook"
            >
              <a href="#!">
                <i className="fa fa-facebook" />
              </a>
            </FacebookShareButton>
          </li>
          <li>
            <PinterestShareButton
              url="https://example.com/blogpost"
              quote="Check out this awesome Product on EcoFit!"
              hashtag="#EcoFit"
              socialMedia="facebook"
            >
              <a href="#!">
                <i className="fa fa-pinterest-p" />
              </a>
            </PinterestShareButton>
          </li>
          <li>
            <TwitterShareButton
              url="https://example.com/blogpost"
              quote="Check out this awesome Product on EcoFit!"
              hashtag="#EcoFit"
              socialMedia="twitter"
            >
              <a href="#!">
                <i className="fa fa-twitter" />
              </a>
            </TwitterShareButton>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-whatsapp" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
