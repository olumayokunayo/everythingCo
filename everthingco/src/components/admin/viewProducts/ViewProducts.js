import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase/config";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import styles from "./ViewProducts.module.scss";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { selectProducts } from "../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";


const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts)
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(
              STORE_PRODUCTS({
                products: data,
              })
            );
  }, [dispatch, data])
  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = () => {
  //   setIsLoading(true);
  //   try {
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("createdAt", "desc"));
  //     onSnapshot(q, (snapshot) => {
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setProducts(allProducts);
  //       setIsLoading(false);
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };
  const deleteProductHandler = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDeleteHandler = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete product",
      "Are you sure you want to delete this item?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProductHandler(id, imageURL);
      },
      function cancelCb() {
        console.log("Cancellation action.");
      },
      {
        width: "320px",
        borderRadius: "8px",
        // etc...
      }
    );
  };
  return (
    <>
      <div className={styles.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, category, price, imageURL } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDeleteHandler(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
