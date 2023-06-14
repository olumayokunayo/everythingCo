import React from "react";
import Slider from "../../slider/Slider";
import AdminOnlyRoute from "../../adminOnlyRoute/AdminOnlyRoute";
import Products from "../../products/Products";

const Home = () => {
  return (
    <div>
      {/* <Slider / > */}
      <h1>Home Page</h1>
    <Products />
    </div>
  );
};

export default Home;
