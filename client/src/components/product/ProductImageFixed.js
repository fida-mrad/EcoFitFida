import PropTypes from "prop-types";
import { calculateScore } from "../../helpers/product";

const ProductImageFixed = ({ product }) => {
  let currentDate = new Date();
  let createdAtDate = new Date(product.createdAt);
  let diffInDays = (currentDate - createdAtDate) / (1000 * 60 * 60 * 24);
  return (
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

      <div className="product-fixed-image">
        {product.image ? (
          <img
            src={"http://localhost:8000/images/" + product.image[0]}
            alt=""
            className="img-fluid"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.shape({}),
};

export default ProductImageFixed;
