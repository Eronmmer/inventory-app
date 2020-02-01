import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import { getProducts } from "../../actions/productsAction";
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import {AllStuff} from "../../StyledComponents/utility"
import ProductsComponent from "../../StyledComponents/private/Products";

const Products = props => {
  const { loadUser, getProducts, products,user, isAuthenticated, authLoading } = props;
  useEffect(() => {
    loadUser();
    getProducts();
  }, []);
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);
  if (authLoading || products === null) {
    return (
      <>
        <h2 style={{ textAlign: "center", margin: "3rem auto 0 auto" }}>
          Loading...
        </h2>
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <Navbar private />
        <ProductsComponent>
          <h1 className="products-header">All your Products</h1>
          <AllStuff>
            {products.length !== 0 ? (
              products.map((elem, index) => (
                <div key={index} className="all-stuff-content">
                  <p>
                    <b className="all-stuff-content-bold">Name of product:</b>{" "}
                    {elem.name}
                  </p>
                  <p>
                    <b className="all-stuff-content-bold">Cost price:</b>{" "}
                    #{elem.costPrice}
                  </p>
                  <p>
                    <b className="all-stuff-content-bold">Selling price:</b>{" "}
                    #{elem.sellingPrice}
                  </p>
                  <p>
                    <b className="all-stuff-content-bold">Amount available:</b>{" "}
                    {elem.amountAvailable}
                  </p>
                </div>
              ))
            ) : (
              <h4 className="all-stuff-headers">
                You don't have any Products yet
              </h4>
            )}
          </AllStuff>
        </ProductsComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser, getProducts
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  products: state.products.products
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
