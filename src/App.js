import { Col, Container, Row } from "reactstrap";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import React, { Component } from 'react';
import alertify from "alertifyjs"
import { Route, Routes } from "react-router-dom";
import CartList from "./CartList";
import NotFound from "./NotFound";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  updateCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products"
    if (categoryId) {
      url = url + "?categoryId=" + categoryId
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }))
  }

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    }
    else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + "has been added to cart", 2);
  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id)
    this.setState({ cart: newCart })
  }

  render() {
    let categoryInfo = { title: "Categories" };
    let productInfo = { title: "Products" };
    return (

      <div className="mt-5">

        <Container >
          <Row><Navi removeFromCart={this.removeFromCart} cart={this.state.cart} /></Row>
          <Row >
            <Col xs="3">
              <CategoryList currentCategory={this.state.currentCategory} updateCategory={this.updateCategory} info={categoryInfo} />
            </Col>
            <Col xs="9">
              <Routes>
                <Route  path="/" element={
                  <ProductList addToCart={this.addToCart} products={this.state.products} currentCategory={this.state.currentCategory} info={productInfo} />
                } />
                <Route  path="/cart" element={
                  <CartList />
                } />
                <Route element={NotFound}/>
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}