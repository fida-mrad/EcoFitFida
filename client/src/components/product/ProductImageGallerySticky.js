import PropTypes from "prop-types";
import { calculateScore } from "../../helpers/product";

const productImageGallerySticky = ({ product }) => {
  let currentDate = new Date();
  let createdAtDate = new Date(product.createdAt);
  let diffInDays = (currentDate - createdAtDate) / (1000 * 60 * 60 * 24);
  return (
    <div className="product-large-image-wrapper product-large-image-wrapper--sticky">
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
      <div className="product-sticky-image mb--10">
        {product?.image?.map((single, key) => (
          <div className="product-sticky-image__single mb-10" key={key}>
            <img
              // src={process.env.PUBLIC_URL + single}
              src={"http://localhost:8000/images/" + single}
              alt=""
              className="img-fluid"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

productImageGallerySticky.propTypes = {
  product: PropTypes.shape({}),
};

export default productImageGallerySticky;
