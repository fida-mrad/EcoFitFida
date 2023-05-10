import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";

const ShopBrands = ({ brands, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Brand </h4>
      <div className="sidebar-widget-tag mt-25">
        {brands ? (
          <ul>
            {brands.map((brand, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={(e) => {
                      getSortParams("brands", brand);
                      setActiveSort(e);
                    }}
                  >
                    {brand}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "No brands found"
        )}
      </div>
    </div>
  );
};

ShopBrands.propTypes = {
  getSortParams: PropTypes.func,
  brands: PropTypes.array,
};

export default ShopBrands;
