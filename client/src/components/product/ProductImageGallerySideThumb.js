import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade, Thumbs } from "swiper";
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { calculateScore } from "../../helpers/product";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
  let currentDate = new Date();
  let createdAtDate = new Date(product.createdAt);
  let diffInDays = (currentDate - createdAtDate) / (1000 * 60 * 60 * 24);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const slides = product?.image.map((img, i) => ({
    // src: process.env.PUBLIC_URL + img,
    src: "http://localhost:8000/images/" + img,
    key: i,
  }));

  // swiper slider settings
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
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      320: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      1200: {
        slidesPerView: 4,
        direction: "vertical",
      },
    },
  };

  return (
    <Fragment>
      <div className="row row-5 test">
        <div
          className={clsx(
            thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-10"
          )}
        >
          <div className="product-large-image-wrapper">
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
            {product?.image?.length ? (
              <Swiper options={gallerySwiperParams}>
                {product?.image.map((single, key) => (
                  <SwiperSlide key={key}>
                    <button
                      className="lightgallery-button"
                      onClick={() => setIndex(key)}
                    >
                      {/* <button className="lightgallery-button" onClick={() => setIndex(product._id)}> */}
                      <i className="pe-7s-expand1"></i>
                    </button>
                    <div className="single-image">
                      <img
                        // src={process.env.PUBLIC_URL + single}
                        src={"http://localhost:8000/images/" + single}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
                <AnotherLightbox
                  open={index >= 0}
                  index={index}
                  close={() => setIndex(-1)}
                  slides={slides}
                  plugins={[Thumbnails, Zoom, Fullscreen]}
                />
              </Swiper>
            ) : null}
          </div>
        </div>
        <div
          className={clsx(
            thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2"
          )}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {product?.image?.length ? (
              <Swiper options={thumbnailSwiperParams}>
                {product.image.map((single, key) => (
                  <SwiperSlide key={key}>
                    <div className="single-image">
                      <img
                        // src={process.env.PUBLIC_URL + single}
                        src={"http://localhost:8000/images/" + single}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.shape({}),
  thumbPosition: PropTypes.string,
};

export default ProductImageGalleryLeftThumb;
