import { useEffect } from "react";


const Orders = () => {
  useEffect(()=> {
    getOrder()
  }, [])
  const getOrder = () => {
    console.log('orders');
  }
  return <div>Orders</div>;
};

export default Orders;
