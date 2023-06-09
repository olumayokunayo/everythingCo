import React, {useState} from "react";
import styles from './ProductList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import {FaListAlt} from 'react-icons/fa'
const ProductList = () => {
  const [grid, setGrid] = useState(true)
  return <div className={styles['product-List']} id="product">
  <div className={styles.top}>
    <div className={styles.icons}>
      <BsFillGridFill size={22} color="orangered" onClick={()=> setGrid(true)}/>
      <FaListAlt size={24} color="#0066d4" onClick={()=> setGrid(false)}/>

      <p>
        <b>10</b> Products found.
      </p>
    </div>
    {/* Search Icon */}
    <div>
      <p>Search</p>
    </div>
    {/* Sort Product */}
    <div className={styles.sort}>
  <label>Sort by:</label>
  <select>
    <option value="latest">Latest</option>
    <option value="lowest-price">Lowest Price</option>
    <option value="highest-price">Highest Price</option>
    <option value="a-z">A-Z</option>
    <option value="z-a">Z-A</option>
  </select>
    </div>
  </div>
  </div>;
};

export default ProductList;
