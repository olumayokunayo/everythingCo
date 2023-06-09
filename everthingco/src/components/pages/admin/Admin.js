import React from "react";
import styles from "./Admin.module.scss";
import Navbar from "../../admin/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import AddProduct from "../../admin/addProducts/AddProduct";
import ViewProducts from "../../admin/viewProducts/ViewProducts";
import Orders from "../../admin/orders/Orders";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
