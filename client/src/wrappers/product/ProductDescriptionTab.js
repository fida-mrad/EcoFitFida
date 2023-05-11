import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import { productsController } from "../../services/coreApi";
import { useParams } from "react-router-dom";
import { useClient } from "../../ClientContext";

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  productReviews,
  productMaterials,
}) => {
  const filteredMaterials = productMaterials.filter(
    (material) => material.percentage > 0
  );
  const [revs, setRevs] = useState(productReviews);
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [clientState, setClientState] = useState(null);
  const { client, setClient } = useClient();
  useEffect(() => {
    setClientState((prevState) => ({
      ...prevState,
      firstname: client?.data.firstname,
      lastname: client?.data.lastname,
      _id: client?.data._id,
    }));
  }, [client]);
  const handleStarClick = (index) => {
    setRating(index + 1);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      const className = i < rating ? "fa fa-star" : "fa fa-star-o";
      stars.push(
        <i key={i} className={className} onClick={() => handleStarClick(i)} />
      );
    }

    return stars;
  };
  const addReview = async (event) => {
    event.preventDefault();
    console.log({
      productId: id,
      rating: rating,
      comment: comment,
    });
    const res = await productsController.addReview({
      productId: id,
      rating: rating,
      comment: comment,
    });
    console.log(res);
    if (res.status === 201) {
      setRevs(res.data.reviews);
      setComment("");
      setRating(0);
    }
  };
  const deleteReview = async (e, reviewId) => {
    e.preventDefault();
    const res = await productsController.deleteReview(id, reviewId);
    if (res.status === 200) {
      setRevs(revs.filter((r) => r._id != reviewId));
    }
  };
  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Reviews({revs.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Weight</span> 400 g
                    </li>
                    <li>
                      <span>Dimensions</span>10 x 10 x 15 cm{" "}
                    </li>
                    <li>
                      <span>Materials</span>{" "}
                      {filteredMaterials.map((mat) => {
                        return mat.name + ": " + mat.percentage + "% ";
                      })}
                    </li>
                    {/* <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li> */}
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      {/* {productReviews.map((review, index) => { */}
                      {revs.map((review, index) => {
                        return (
                          <>
                            {index % 2 === 0 ? (
                              <div key={index} className="single-review">
                                <div className="review-img">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/img/testimonial/1.jpg"
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="review-content">
                                  <div className="review-top-wrap">
                                    <div className="review-left">
                                      <div className="review-name">
                                        <h4>
                                          {review.client.firstname}{" "}
                                          {review.client.lastname}
                                        </h4>
                                      </div>
                                      <div className="review-rating">
                                        {[...Array(review.rating)].map(
                                          (star, index) => (
                                            <i
                                              key={index}
                                              className="fa fa-star"
                                            ></i>
                                          )
                                        )}
                                        {[...Array(5 - review.rating)].map(
                                          (star, index) => (
                                            <i
                                              key={review.rating + index}
                                              className="fa fa-star-o"
                                            ></i>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="review-left">
                                      {clientState &&
                                        clientState._id ===
                                          review.client._id && (
                                          <button
                                            onClick={(e) =>
                                              deleteReview(e, review._id)
                                            }
                                          >
                                            <i
                                              class="fas fa-trash"
                                              style={{ color: "#ff0026" }}
                                            ></i>
                                          </button>
                                        )}
                                    </div>
                                  </div>
                                  <div className="review-bottom">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="single-review child-review">
                                <div className="review-img">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/img/testimonial/2.jpg"
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="review-content">
                                  <div className="review-top-wrap">
                                    <div className="review-left">
                                      <div className="review-name">
                                        <h4>
                                          {" "}
                                          {review.client.firstname}{" "}
                                          {review.client.lastname}
                                        </h4>
                                      </div>
                                      <div className="review-rating">
                                        {[...Array(review.rating)].map(
                                          (star, index) => (
                                            <i
                                              key={index}
                                              className="fa fa-star"
                                            ></i>
                                          )
                                        )}
                                        {[...Array(5 - review.rating)].map(
                                          (star, index) => (
                                            <i
                                              key={review.rating + index}
                                              className="fa fa-star-o"
                                            ></i>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="review-left">
                                      {clientState &&
                                        clientState._id ===
                                          review.client._id && (
                                          <button
                                            onClick={(e) =>
                                              deleteReview(e, review._id)
                                            }
                                          >
                                            <i
                                              class="fas fa-trash"
                                              style={{ color: "#ff0026" }}
                                            ></i>
                                          </button>
                                        )}
                                    </div>
                                  </div>
                                  <div className="review-bottom">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      <div className="ratting-form">
                        <form action="#" onSubmit={addReview}>
                          <div className="star-box">
                            <span>Your rating:</span>
                            <div className="ratting-star">{renderStars()}</div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  name="Your Review"
                                  placeholder="Message"
                                  value={comment}
                                  onChange={handleCommentChange}
                                />
                                <input type="submit" defaultValue="Submit" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
