import React from "react";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Head from "./components/Head/Head";
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Head />}>
            <Route path="product" element={<Product />}></Route>
            <Route path="products" element={<Products />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
