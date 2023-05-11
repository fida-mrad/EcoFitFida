import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from "swiper";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRating";
import Swiper, { SwiperSlide } from "../../components/swiper";
import {
  getDiscountPrice,
  getProductCartQuantity,
} from "../../helpers/product";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { productsController } from "../../services/coreApi";

function ProductModalBackOffice({
  productId,
  //   currency,
  //   discountedPrice,
  //   finalProductPrice,
  //   finalDiscountedPrice,
  show,
  onHide,
}) {
  const { products } = useSelector((state) => state.product);
  let product = products.find((p) => p._id === productId);
  const currency = useSelector((state) => state.currency);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();

  let discountedPrice = getDiscountPrice(product?.price, product?.discount);
  let finalProductPrice = (product?.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = (
    discountedPrice * currency.currencyRate
  ).toFixed(2);

  //   const [selectedProductColor, setSelectedProductColor] = useState(
  //     product?.variation.length !== 0 ? product?.variation[0].color : ""
  //   );
  //   const [selectedProductSize, setSelectedProductSize] = useState(
  //     product?.variation.length !== 0 ? product?.variation[0].size[0].name : ""
  //   );
  //   const [productStock, setProductStock] = useState(
  //     product?.variation.length !== 0
  //       ? product?.variation[0].size[0].stock
  //       : product?.stock
  //   );
  const [quantityCount, setQuantityCount] = useState(1);

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    // onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true,
  };

  const onCloseModal = () => {
    setThumbsSwiper(null);
    onHide();
  };
  let averageRating =
    product?.reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0) / product?.reviews.length;
  averageRating = Math.floor(averageRating);
  const filteredMaterials = product?.materials?.filter(
    (material) => material.percentage > 0
  );
  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="product-large-image-wrapper">
              <Swiper options={gallerySwiperParams}>
                {product?.image &&
                  product?.image.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image">
                          <img
                            src={"http://localhost:8000/images/" + img}
                            className="img-fluid"
                            alt="Product"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div className="product-small-image-wrapper mt-15">
              <Swiper options={thumbnailSwiperParams}>
                {product?.image &&
                  product?.image?.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image">
                          <img
                            src={"http://localhost:8000/images/" + img}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 col-xs-12">
            <div className="product-details-content quickview-content">
              <h2>{product?.name}</h2>
              <br></br>
              <h4>
                <i class="far fa-registered"></i> {product?.brand.brandname}
              </h4>
              <div className="product-details-price">
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
              {product?.reviews.length > 0 && averageRating > 0 ? (
                <div className="pro-details-rating-wrap">
                  <div className="pro-details-rating">
                    <Rating ratingValue={averageRating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="pro-details-list">
                <p>{product?.shortDescription}</p>
                <span>Materials: </span> <br></br>
                {filteredMaterials?.map((mat) => {
                  return mat.name + ": " + mat.percentage + "% ";
                })}
              </div>
              {product?.variation ? (
                <div className="pro-details-size-color">
                  <div className="pro-details-color-wrap">
                    <span>Variations :</span>
                    <div className="pro-details-color-content">
                      {product?.variation.map((single, key) => {
                        return (
                          <>
                            <label
                              className={`pro-details-color-content--single ${single.color}`}
                              key={key}
                            >
                              <input
                                type="radio"
                                value={single.color}
                                name="product-color"
                              />
                              {/* <span className="checkmark"></span> */}
                            </label>
                            {single.size.map((size) => {
                              return (
                                <>
                                  {size.name.toUpperCase()} : {size.stock}{" "}
                                </>
                              );
                            })}
                            <br></br>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ProductModalBackOffice.propTypes = {
  //   currency: PropTypes.shape({}),
  //   discountedprice: PropTypes.number,
  //   finaldiscountedprice: PropTypes.number,
  //   finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.shape({}),
  show: PropTypes.bool,
};

export default ProductModalBackOffice;
