import React from 'react';
import NavBar from './Navbar';
import Footer from './Footer';

function Cart() {
    return ( 
        <>
        {/* // <!-- Nav Bar Start --> */}
        <NavBar></NavBar>
        {/* // <!-- Nav Bar End -->       */}

        {/* <!-- Cart Start --> */}
        <div className="cart-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="cart-page-inner">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        <tr>
                                            <td>
                                                <div className="img">
                                                    <a href="#"><img src="assets/images/product_1.png" alt="Image"/></a>
                                                    <p>Product Name</p>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td>
                                                <div className="qty">
                                                    <button className="btn-minus"><i className="fa fa-minus"></i></button>
                                                    <input type="text" value="1"/>
                                                    <button className="btn-plus"><i className="fa fa-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td><button><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="img">
                                                    <a href="#"><img src="assets/images/product_9.png" alt="Image"/></a>
                                                    <p>Product Name</p>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td>
                                                <div className="qty">
                                                    <button className="btn-minus"><i className="fa fa-minus"></i></button>
                                                    <input type="text" value="1"/>
                                                    <button className="btn-plus"><i className="fa fa-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td><button><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="img">
                                                    <a href="#"><img src="assets/images/product_3.png" alt="Image"/></a>
                                                    <p>Product Name</p>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td>
                                                <div className="qty">
                                                    <button className="btn-minus"><i className="fa fa-minus"></i></button>
                                                    <input type="text" value="1"/>
                                                    <button className="btn-plus"><i className="fa fa-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td><button><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="img">
                                                    <a href="#"><img src="assets/images/product_4.png" alt="Image"/></a>
                                                    <p>Product Name</p>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td>
                                                <div className="qty">
                                                    <button className="btn-minus"><i className="fa fa-minus"></i></button>
                                                    <input type="text" value="1"/>
                                                    <button className="btn-plus"><i className="fa fa-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td><button><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="img">
                                                    <a href="#"><img src="assets/images/product_5.png" alt="Image"/></a>
                                                    <p>Product Name</p>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td>
                                                <div className="qty">
                                                    <button className="btn-minus"><i className="fa fa-minus"></i></button>
                                                    <input type="text" value="1"/>
                                                    <button className="btn-plus"><i className="fa fa-plus"></i></button>
                                                </div>
                                            </td>
                                            <td>$99</td>
                                            <td><button><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="cart-page-inner">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="coupon">
                                        <input type="text" placeholder="Coupon Code"/>
                                        <button>Apply Code</button>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="cart-summary">
                                        <div className="cart-content">
                                            <h1>Cart Summary</h1>
                                            <p>Sub Total<span>$99</span></p>
                                            <p>Shipping Cost<span>$1</span></p>
                                            <h2>Grand Total<span>$100</span></h2>
                                        </div>
                                        <div className="cart-btn">
                                            <button>Update Cart</button>
                                            <button>Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Cart End --> */}
        
        {/* <!-- Footer Start --> */}
        <Footer />
        {/* <!-- Footer End --> */}
        
        {/* <!-- Footer Bottom Start --> */}
        {/* <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 copyright">
                        <p>Copyright &copy; <a href="https://htmlcodex.com">HTML Codex</a>. All Rights Reserved</p>
                    </div>

                    <div className="col-md-6 template-by">
                        <p>Template By <a href="https://htmlcodex.com">HTML Codex</a></p>
                    </div>
                </div>
            </div>
        </div> */}
        {/* <!-- Footer Bottom End -->        */}
        
        {/* <!-- Back to Top --> */}
        <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
        </>
     );
}

export default Cart