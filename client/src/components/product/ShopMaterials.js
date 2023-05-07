import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";

const ShopMaterials = ({ materials, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Material </h4>
      <div className="sidebar-widget-list mt-20">
        {materials ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("material", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All materials{" "}
                </button>
              </div>
            </li>
            {materials.map((material, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("material", material);
                        setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" /> {material}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No materials found"
        )}
      </div>
    </div>
  );
};

ShopMaterials.propTypes = {
  materials: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopMaterials;
