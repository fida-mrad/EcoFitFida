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
import ProductModalBackOffice from "./product/ProductModalBackOffice";
function ProductsAdmin({ agent }) {
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
  const [modalShow, setModalShow] = useState(false);

  //   const [alert, setAlert] = useState(false);

  const getProducts = async () => {
    const res = await productsController.getAll();
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
  const deleteProduct = async (id) => {
    const res = await productsController.deleteProductByAdmin(id);
    if (res.status === 200) {
      const updatedProducts = products.filter((p) => p._id !== id);
      setProducts(updatedProducts);
    }
  };
  return (
    <>
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
                <CCarousel controls transition="crossfade" interval={3500}>
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
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <CButton
                      onClick={() => {
                        setModalShow(true);
                        setCurrentProductId(product._id);
                      }}
                    >
                      <i class="fas fa-eye"></i>
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <i class="fas fa-trash"></i>
                    </CButton>
                  </div>
                  {/* product modal */}
                  <ProductModalBackOffice
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    productId={currentProductId}
                  />
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

export default ProductsAdmin;
