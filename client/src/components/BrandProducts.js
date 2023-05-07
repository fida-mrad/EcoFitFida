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
  CImage,
  CListGroup,
  CListGroupItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import Rating from "../components/product/sub-components/ProductRating";
import { productsController } from "../services/Api";
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
                    <i class="fa fa-eye"></i>
                  </CButton>
                  <CButton
                    color="warning"
                    onClick={() => goToUpdateForm(product._id)}
                  >
                    <i class="fa fa-pen-square"></i>
                  </CButton>
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
