import React, { useState } from "react";
import chroma from "chroma-js";
import nearestColor from "nearest-color";
import {
  CAlert,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { productsController } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { useAgent } from "../AgentContext";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
const colors = {
  aliceblue: "#F0F8FF",
  antiquewhite: "#FAEBD7",
  aqua: "#00FFFF",
  aquamarine: "#7FFFD4",
  azure: "#F0FFFF",
  beige: "#F5F5DC",
  bisque: "#FFE4C4",
  black: "#000000",
  blanchedalmond: "#FFEBCD",
  blue: "#0000FF",
  blueviolet: "#8A2BE2",
  brown: "#A52A2A",
  burlywood: "#DEB887",
  cadetblue: "#5F9EA0",
  chartreuse: "#7FFF00",
  chocolate: "#D2691E",
  coral: "#FF7F50",
  cornflowerblue: "#6495ED",
  cornsilk: "#FFF8DC",
  crimson: "#DC143C",
  cyan: "#00FFFF",
  darkblue: "#00008B",
  darkcyan: "#008B8B",
  darkgoldenrod: "#B8860B",
  darkgray: "#A9A9A9",
  darkgreen: "#006400",
  darkkhaki: "#BDB76B",
  darkmagenta: "#8B008B",
  darkolivegreen: "#556B2F",
  darkorange: "#FF8C00",
  darkorchid: "#9932CC",
  darkred: "#8B0000",
  darksalmon: "#E9967A",
  darkseagreen: "#8FBC8F",
  darkslateblue: "#483D8B",
  darkslategray: "#2F4F4F",
  darkturquoise: "#00CED1",
  darkviolet: "#9400D3",
  deeppink: "#FF1493",
  deepskyblue: "#00BFFF",
  dimgray: "#696969",
  dodgerblue: "#1E90FF",
  firebrick: "#B22222",
  floralwhite: "#FFFAF0",
  forestgreen: "#228B22",
  fuchsia: "#FF00FF",
  gainsboro: "#DCDCDC",
  ghostwhite: "#F8F8FF",
  gold: "#FFD700",
  goldenrod: "#DAA520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#ADFF2F",
  honeydew: "#F0FFF0",
  hotpink: "#FF69B4",
  indianred: "#CD5C5C",
  indigo: "#4B0082",
  ivory: "#FFFFF0",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  lavenderblush: "#FFF0F5",
  lawngreen: "#7CFC00",
  lemonchiffon: "#FFFACD",
  lightblue: "#ADD8E6",
  lightcoral: "#F08080",
  lightcyan: "#E0FFFF",
  lightgoldenrodyellow: "#FAFAD2",
  lightgray: "#D3D3D3",
  lightgreen: "#90EE90",
  lightpink: "#FFB6C1",
  lightsalmon: "#FFA07A",
  lightseagreen: "#20B2AA",
  lightskyblue: "#87CEFA",
  lightslategray: "#778899",
  lightsteelblue: "#B0C4DE",
  lightyellow: "#FFFFE0",
  lime: "#00FF00",
  limegreen: "#32CD32",
  linen: "#FAF0E6",
  magenta: "#FF00FF",
  maroon: "#800000",
  mediumaquamarine: "#66CDAA",
  mediumblue: "#0000CD",
  mediumorchid: "#BA55D3",
  mediumpurple: "#9370DB",
  mediumseagreen: "#3CB371",
  mediumslateblue: "#7B68EE",
  mediumspringgreen: "#00FA9A",
  mediumturquoise: "#48D1CC",
  mediumvioletred: "#C71585",
  midnightblue: "#191970",
  mintcream: "#F5FFFA",
  mistyrose: "#FFE4E1",
  moccasin: "#FFE4B5",
  navajowhite: "#FFDEAD",
  navy: "#000080",
  oldlace: "#FDF5E6",
  olive: "#808000",
  olivedrab: "#6B8E23",
  orange: "#FFA500",
  orangered: "#FF4500",
  orchid: "#DA70D6",
  palegoldenrod: "#EEE8AA",
  palegreen: "#98FB98",
  paleturquoise: "#AFEEEE",
  palevioletred: "#DB7093",
  papayawhip: "#FFEFD5",
  peachpuff: "#FFDAB9",
  peru: "#CD853F",
  pink: "#FFC0CB",
  plum: "#DDA0DD",
  powderblue: "#B0E0E6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#FF0000",
  rosybrown: "#BC8F8F",
  royalblue: "#4169E1",
  saddlebrown: "#8B4513",
  salmon: "#FA8072",
  sandybrown: "#F4A460",
  seagreen: "#2E8B57",
  seashell: "#FFF5EE",
  sienna: "#A0522D",
  silver: "#C0C0C0",
  skyblue: "#87CEEB",
  slateblue: "#6A5ACD",
  slategray: "#708090",
  snow: "#FFFAFA",
  springgreen: "#00FF7F",
  steelblue: "#4682B4",
  tan: "#D2B48C",
  teal: "#008080",
  thistle: "#D8BFD8",
  tomato: "#FF6347",
  turquoise: "#40E0D0",
  violet: "#EE82EE",
  wheat: "#F5DEB3",
  white: "#FFFFFF",
  whitesmoke: "#F5F5F5",
  yellow: "#FFFF00",
  yellowgreen: "#9ACD32",
};
function AddProduct() {
  const [materials, setMaterials] = useState([
    { name: "Cotton", percentage: 0 },
    // { name: "Hemp", percentage: 0 },
    { name: "Linen", percentage: 0 },
    { name: "Silk", percentage: 0 },
    { name: "Wool", percentage: 0 },
    // { name: "Cashmere", percentage: 0 },
    { name: "Polyester", percentage: 0 },
  ]);

  const handlePercentageChange = (event, index) => {
    const newMaterials = [...materials];
    newMaterials[index].percentage = parseInt(event.target.value);
    setMaterials(newMaterials);
  };

  const { agent } = useAgent();
  const brandId = agent?.data.brand._id;
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  const [variations, setVariations] = useState([
    { color: "#000000", size: [{ name: "", stock: "" }] },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    images: [],
    shortDescription: "",
    fullDescription: "",
  });
  const { name, price, images, shortDescription, fullDescription } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    setCategory([e.target.value]);
  };
  const handleVariationChange = (index, colorIndex, field, value) => {
    setVariations((prevState) => {
      const updatedVariations = [...prevState];
      if (field === "color" && prevState.some((v) => v.color === value)) {
        return prevState; // color already exists, do not update
      } else {
        if (colorIndex === null) {
          updatedVariations[index] = {
            ...updatedVariations[index],
            [field]: value,
          };
        } else {
          updatedVariations[index].size[colorIndex] = {
            ...updatedVariations[index].size[colorIndex],
            [field]: value,
          };
        }
        return updatedVariations;
      }
    });
  };

  const handleAddVariation = () => {
    setVariations((prevState) => [
      ...prevState,
      { color: "#000000", size: [{ name: "", stock: "" }] },
    ]);
  };

  const handleAddSize = (index) => {
    setVariations((prevState) => {
      const updatedVariations = [...prevState];
      const lastColorIndex = updatedVariations[index].size.length - 1;
      const lastColor = updatedVariations[index].size[lastColorIndex];
      if (lastColor.name === "" && lastColor.stock === "") {
        return prevState; // last size fields are empty, do not add new size
      } else {
        updatedVariations[index].size.push({ name: "", stock: "" });
        return updatedVariations;
      }
    });
  };
  const handleFileInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files,
    });
  };
  const validateForm = () => {
    let result = { status: false, message: "Please Fill In All Fields !" };
    if (!formData.name || formData.name === "") {
      result.message = "Please Enter A Product Name";
      return result;
    }
    if (!formData.price || formData.price === "") {
      result.message = "Please Enter The Product's Price";
      return result;
    }
    if (!formData.shortDescription || formData.shortDescription === "") {
      result.message = "Please Enter A Short Description";
      return result;
    }
    if (!formData.fullDescription || formData.fullDescription === "") {
      result.message = "Please Enter A Full Description";
      return result;
    }
    if (!formData.images || formData.images.length === 0) {
      result.message = "Please Enter The Product's Images";
      return result;
    }
    if (!categories || categories.length === 0) {
      result.message = "Please Choose Your Prodcut's Categories";
      return result;
    }
    if (!tags || tags.length === 0) {
      result.message = "Please Choose Your Prodcut's Tags";
      return result;
    }
    let totalPercentage = materials.reduce((total, mat) => {
      return total + mat.percentage;
    }, 0);
    if (totalPercentage !== 100) {
      result.message = "Make Sure that the Materials Total is 100%";
      return result;
    }
    const hasEmptyFields = variations.some((variation) =>
      variation.size.some(({ name, stock }) => name === "" || stock === "")
    );
    if (hasEmptyFields) {
      console.log(variations);
      result.message = "Please Fill In Your Varitions Correctly";
      return result;
    }
    result = true;
    return result;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let category = [...categories, "fashion"];
    // const uniqueArray = Array.from(new Set(category));
    const uniqueArray = Array.from(
      new Set(category.map((str) => str[0].toUpperCase() + str.slice(1)))
    );
    const colorMap = nearestColor.from(colors);
    const updatedVariations = variations.map((v) => {
      const closestColorName = colorMap(v.color).name;
      return {
        ...v,
        color: closestColorName,
      };
      // const closestColorName = chroma(v.color).name();
      // if (closestColorName) {
      //   return {
      //     ...v,
      //     color: closestColorName,
      //   };
      // }
    });
    // console.log(updatedVariations);
    let fromIsValid = validateForm();
    if (fromIsValid.status) {
      const data = {
        ...formData,
        materials,
        brand: brandId,
        // category: [...category, "fashion"],
        category: uniqueArray,
        // category: category,
        variations: updatedVariations,
        tags,
      };
      console.log("Data : ");
      console.log(data);
      const res = await productsController.addProduct(data);
      console.log(res);
      if (res.status === 201) {
        navigate("/agent/products");
      } else {
        setError(true);
        setAlertMessage(res.data.msg);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } else {
      setError(true);
      setAlertMessage(fromIsValid.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  return (
    <>
      {error && <CAlert color="danger">{alertMessage}</CAlert>}
      <CForm onSubmit={handleSubmit} encType="multipart/form-data">
        <CRow className="g-3">
          <CCol xs>
            <CFormInput
              placeholder="Name"
              aria-label="First name"
              label="Name :"
              onChange={handleChange("name")}
              value={name}
            />
          </CCol>
          <CCol xs>
            <CFormInput
              placeholder="Price"
              aria-label="Last name"
              type="number"
              label="Price :"
              name="price"
              onChange={handleChange("price")}
              value={price}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            <CFormTextarea
              placeholder="Short Description"
              aria-label="shortDescription"
              label="Short Description :"
              name="shortDescription"
              onChange={handleChange("shortDescription")}
              value={shortDescription}
              rows={5}
            />
          </CCol>
          <CCol xs>
            <CFormTextarea
              placeholder="Full Description"
              aria-label="fullDescription"
              type="number"
              label="Full Description :"
              name="fullDescription"
              onChange={handleChange("fullDescription")}
              value={fullDescription}
              rows={5}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            <CFormInput
              type="file"
              multiple
              name="images"
              onChange={handleFileInput}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            <CFormLabel htmlFor="categories">Categories :</CFormLabel>
            <InputTags
              values={categories}
              onTags={(value) => {
                setCategories(value.values);
              }}
            />
          </CCol>
          <CCol xs>
            <CFormLabel htmlFor="tags">Tags :</CFormLabel>
            <InputTags
              values={tags}
              onTags={(value) => {
                setTags(value.values);
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            {variations.map((variation, index) => (
              <div key={index}>
                <CFormInput
                  label="Color :"
                  type="color"
                  value={variation.color}
                  onChange={(e) =>
                    handleVariationChange(index, null, "color", e.target.value)
                  }
                ></CFormInput>
                {variation.size.map((size, colorIndex) => (
                  <CRow key={colorIndex}>
                    <CCol md={5}>
                      <CFormInput
                        label="Size :"
                        placeholder="Size"
                        type="text"
                        value={size.name}
                        onChange={(e) =>
                          handleVariationChange(
                            index,
                            colorIndex,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </CCol>
                    <CCol md={5}>
                      <CFormInput
                        label="Stock :"
                        placeholder="Stock"
                        type="number"
                        min={0}
                        value={size.stock}
                        onChange={(e) =>
                          handleVariationChange(
                            index,
                            colorIndex,
                            "stock",
                            e.target.value
                          )
                        }
                      />
                    </CCol>
                    {colorIndex === variation.size.length - 1 && (
                      <CCol md={2} xs={12}>
                        <CButton
                          color="warning"
                          onClick={() => handleAddSize(index)}
                        >
                          +
                        </CButton>
                      </CCol>
                    )}
                  </CRow>
                ))}
              </div>
            ))}
          </CCol>
          <CRow>
            <CCol md={3}>
              <CButton
                color="primary"
                onClick={handleAddVariation}
                style={{ marginTop: "2px", marginBottom: "2px" }}
              >
                Add Variation
              </CButton>
            </CCol>
          </CRow>
        </CRow>
        <CRow>
          {/* <div> */}
          {materials.map((material, index) => (
            <div key={material.name}>
              {/* <label htmlFor={material.name}>{material.name}</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={material.percentage}
                  onChange={(event) => handlePercentageChange(event, index)}
                /> */}
              <CInputGroup className="mb-3">
                <CInputGroupText id={material.name}>
                  {material.name}
                </CInputGroupText>
                <CFormInput
                  type="number"
                  min="0"
                  max="100"
                  value={material.percentage}
                  onChange={(event) => handlePercentageChange(event, index)}
                  aria-describedby="basic-addon1"
                />
              </CInputGroup>
            </div>
          ))}
          {/* </div> */}
        </CRow>
        <CRow>
          <CCol md={3}>
            <CButton color="success" type="submit">
              Add Product
            </CButton>
          </CCol>
        </CRow>
      </CForm>
      {error && (
        <CAlert color="danger" style={{ marginTop: "10px" }}>
          {alertMessage}
        </CAlert>
      )}
    </>
  );
}

export default AddProduct;
