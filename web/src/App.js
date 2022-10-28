import "./App.css";

import React from "react";

import NavBar from "./component/navbar/navbar";
import Product from "./component/product";
import Shop from "./component/shop";
import Cart from "./component/cart";
import Page from "./component/page";
import Proceed from "./component/proceed";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,/////it is 'a' anchor tag
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />

      {/* {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
 
        <Route path="/product" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/page" element={<Page />}/>
        <Route path="/proceed" element={<Proceed />}/>
      </Routes> 
    </Router>
   
  );
}

export default App;