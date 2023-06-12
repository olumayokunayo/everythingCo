import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import styles from "./ViewProducts.module.scss";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    try {
      setIsLoading(true);
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
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
              console.log(products);
              const { id, name, category, price, imageURL } = product;
              return (
            
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={imageURL} alt={name} style={{ width: "100px" }} />
                  </td>
                  <td>{name}</td>
                  <td>{category}</td>
                  <td>{`$${price}`}</td>
                  <td>
                    <Link to="/admin/add-product">
                      <FaEdit size={20} color="green" />
                    </Link>
                    &nbsp;
                    <FaTrashAlt size={18} color="red" />
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
