import React, { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const detectFormHandler = (id, f1, f2) => {
  if (id === "ADD") {
    return f1;
  }
  return f2;
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  const defaultProduct = { ...initialState };

  const [product, setProduct] = useState(() => {
    const newState = detectFormHandler(
      id,
      defaultProduct,
      productEdit || defaultProduct
    );
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `everythingCo/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };
  const addProductHandler = (e) => {
    e.preventDefault();
    console.log(product);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      toast.success("Product uploaded successfully");
      console.log("Document written with ID: ", docRef.id);
      setUploadProgress(0);
      setProduct({ ...initialState });
      navigate("/admin/all-products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editProductHandler =  (e) => {
    e.preventDefault();

    if(product.imageURL !== productEdit.imageURL){
      const storageRef = ref(storage, productEdit.imageURL);
       deleteObject(storageRef);
    }
    try {
       setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
       
      });
      toast.success("Product edited successfully")
      navigate("/admin/all-products")
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <div className={styles.product}>
      <h2>{detectFormHandler(id, "Add Product", "Edit Product")}</h2>
      <Card cardClass={styles.card}>
        <form
          onSubmit={detectFormHandler(
            id,
            addProductHandler,
            editProductHandler
          )}
        >
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
            required
          />

          <label>Product Image:</label>
          <Card cardClass={styles.group}>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading ${uploadProgress}%`
                    : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              placeholder="Product Image"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {product.imageURL === "" ? null : (
              <input
                type="text"
                name="imageURL"
                value={product.imageURL}
                placeholder="Image URL"
                disabled
                //  required
              />
            )}
          </Card>

          <label>Product Price:</label>
          <input
            type="number"
            placeholder="Product price"
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
            required
          />

          <label>Product Category</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- choose product category --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>

          <label>Product Company/Brand:</label>
          <input
            type="text"
            placeholder="Product brand"
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
            required
          />

          <label>Product Description:</label>
          <textarea
            cols="30"
            rows="10"
            name="desc"
            placeholder="Product description"
            value={product.desc}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <button className="--btn">
            {detectFormHandler(id, "Save Product", "Edit Product")}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
