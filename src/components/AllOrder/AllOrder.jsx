import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Puff } from 'react-loader-spinner';

export default function AllOrders() {
    const [userOrders, setUserOrders] = useState(null);

    useEffect(() => {
        const decodedToken = jwtDecode(localStorage.getItem("tkn"));
        userOrder(decodedToken.id);
    }, []);

    async function userOrder(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            setUserOrders(data);
        } catch (error) {
            console.log("error", error);
        }
    }

    if (userOrders === null) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Puff
                    visible={true}
                    height={80}
                    width={80}
                    color="#0F969C"
                    ariaLabel="puff-loading"
                />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>All Orders</title>
            </Helmet>
            <style>{`
                body {
                    background: linear-gradient(to top, #072E33, #009578); 
                    margin: 0;
                    padding: 0; 
                    font-family: Arial, sans-serif;
                    color: #fff;
                }
                .order-container {
                    background: linear-gradient(to top, #072E33, #009578);
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 20px;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
                }
                .order-image {
                    width: 100%;
                    border-radius: 5px;
                }
                .order-info {
                    margin-top: 10px;
                }
                .order-info h3 {
                    margin-bottom: 5px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #8dc73f;
                }
                .order-info h5 {
                    margin-bottom: 5px;
                    font-size: 14px;
                    color: #8dc73f;
                }
                .order {
                    font-size: 16px;
                    color: #8dc73f;
                }
            `}</style>
            <div className="container mt-5 pt-5">
                <div className="row g-4">
                    {userOrders.map((order, idx) => (
                        <div key={idx} className="col-md-6">
                            <div className="order-container rounded-3 p-3">
                                <div className="container">
                                    <div className="row">
                                        {order.cartItems?.map((item, indx) => (
                                            <div key={indx} className="col-md-4">
                                                <div key={indx} className=" my-2">
                                                    <img src={item.product.imageCover} alt="Product" className="order-image" />
                                                    <div className="order-info">
                                                        <h3>{item.product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                                        <h5>Count: {item.count}</h5>
                                                        <h5>Price: {item.price}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className='order'>Order with phone {order.shippingAddress.phone} and with details {order.shippingAddress.details} at {order.shippingAddress.city}</p>
                                <div className="order-info">
                                    <h5>Payment Method: {order.paymentMethodType}</h5>
                                    <h5>Total Order Price: {order.totalOrderPrice}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
