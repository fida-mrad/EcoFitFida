import React, { useEffect, useState } from "react";
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCarousel,
  CCarouselItem,
  CCol,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import Rating from "../components/product/sub-components/ProductRating";
import { productsController } from "../services/coreApi";
import { useAgent } from "../AgentContext";
import { useNavigate } from "react-router-dom";
import AngularImg from "../assets/images/angular.jpg";
import ReactImg from "../assets/images/react.jpg";
import VueImg from "../assets/images/vue.jpg";
function BrandProducts({ agent }) {
  const navigate = useNavigate();
  // const { agent } = useAgent();
  // console.log("agent.data : ");
  // console.log(agent?.data);
  useEffect(() => {
    console.log("Agent : ");
    console.log(agent);
    // if (agent!=null && agent.status>400) {
    //   console.log("not logged in");
    // }
    getProducts();
  }, [agent]);

  const [products, setProducts] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discount, setDiscount] = useState(0);
  //   const [alert, setAlert] = useState(false);

  const getProducts = async () => {
    const res = await productsController.getProductsByBrand({
      brandId: agent?.data.brand._id,
    });
    if (res.status === 200) setProducts(res.data);
  };
  const goToUpdateForm = (id) => {
    navigate(`/agent/updateProduct/${id}`);
  };
  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };
  const setProductOnSale = async (e) => {
    e.preventDefault();
    let data = { productId: currentProductId, discount: discount };
    console.log(data);
    const res = await productsController.setOnSale(data);
    console.log(res);
    if (res.status === 201) {
      setShowDiscountInput(false);
    }
  };
  return (
    <>
      {/* <h1>Agent : {agent?.data.email}</h1> */}
      {products
        .reduce((rows, product, index) => {
          let averageRating;
          let filteredMaterials = product.materials.filter(
            (material) => material.percentage > 0
          );
          if (product.reviews.length > 0) {
            averageRating =
              product.reviews.reduce((total, review) => {
                return total + review.rating;
              }, 0) / product.reviews.length;
            averageRating = Math.floor(averageRating);
          }
          if (index % 3 === 0) rows.push([]);
          const row = rows[rows.length - 1];
          row.push(
            <CCol key={index} sm={4}>
              <CCard className="text-center" style={{ width: "18rem" }}>
                <CCardHeader style={{ fontWeight: "bold" }}>
                  {product.name}
                </CCardHeader>
                <CCarousel controls transition="crossfade">
                  {product.image.map((img, i) => {
                    return (
                      <CCarouselItem key={i}>
                        <CImage
                          className="d-block w-100"
                          style={{ width: 300, height: 400 }}
                          src={"http://localhost:8000/images/" + img}
                          alt={`${product.name}`}
                        />
                      </CCarouselItem>
                    );
                  })}
                </CCarousel>
                <CCardBody>
                  <CCardTitle>Price : {product.price}</CCardTitle>
                  <CListGroup flush>
                    <CListGroupItem>
                      {" "}
                      {product.shortDescription.substring(0, 150)}...
                    </CListGroupItem>
                    <CListGroupItem>
                      {filteredMaterials.map((mat) => {
                        return mat.name + ": " + mat.percentage + "% ";
                      })}
                    </CListGroupItem>
                    <CListGroupItem>
                      {" "}
                      {averageRating ? (
                        <div className="review-rating">
                          {[...Array(averageRating)].map((star, index) => (
                            <i key={index} className="fa fa-star"></i>
                          ))}
                          {[...Array(5 - averageRating)].map((star, index) => (
                            <i key={index} className="fa fa-star-o"></i>
                          ))}
                        </div>
                      ) : (
                        <div className="review-rating">
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                      )}
                    </CListGroupItem>
                  </CListGroup>
                  <CButton>
                    <i class="fas fa-eye"></i>
                  </CButton>
                  <CButton
                    color="warning"
                    onClick={() => goToUpdateForm(product._id)}
                  >
                    <i class="fas fa-pen"></i>
                  </CButton>
                  <CButton
                    color="info"
                    onClick={() => {
                      setShowDiscountInput(true);
                      setCurrentProductId(product._id);
                    }}
                  >
                    <i class="fas fa-percentage"></i>
                  </CButton>
                  <CModal
                    visible={showDiscountInput}
                    onClose={() => setShowDiscountInput(false)}
                  >
                    <CModalHeader onClose={() => setShowDiscountInput(false)}>
                      <CModalTitle>Put Product On Sale</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>%</CInputGroupText>
                        <CFormInput
                          min={0}
                          max={90}
                          placeholder="Discount Rate"
                          onChange={handleDiscountChange}
                          value={discount}
                        />
                      </CInputGroup>
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        color="secondary"
                        onClick={() => setShowDiscountInput(false)}
                      >
                        Close
                      </CButton>
                      <CButton color="primary" onClick={setProductOnSale}>
                        Save changes
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </CCardBody>
              </CCard>
            </CCol>
          );
          return rows;
        }, [])
        .map((row, index) => (
          <CRow className="mt-3 mb-2" key={index}>
            {row}
          </CRow>
        ))}
    </>
  );
}

export default BrandProducts;
