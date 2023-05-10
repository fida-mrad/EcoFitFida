import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../components/swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { getEcoProducts, getProducts } from "../../helpers/product";

const settings = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
};

const EcoFriendlyProducts = ({ spaceBottomClass }) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, null, null, 6);
  const ecoFriendlyProducts = getEcoProducts(products);

  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitle
          titleText="Eco Friendly Products"
          positionClass="text-center"
          spaceClass="mb-50"
        />
        {ecoFriendlyProducts?.length ? (
          <Swiper options={settings}>
            {ecoFriendlyProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductGridSingle
                  product={product}
                  currency={currency}
                  cartItem={cartItems.find(
                    (cartItem) => cartItem.id === product._id
                  )}
                  wishlistItem={wishlistItems.find(
                    (wishlistItem) => wishlistItem.id === product._id
                  )}
                  compareItem={compareItems.find(
                    (compareItem) => compareItem.id === product._id
                  )}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
};

EcoFriendlyProducts.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default EcoFriendlyProducts;
