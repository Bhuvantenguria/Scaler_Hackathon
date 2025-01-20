import React, { useState, useEffect } from "react";
import UserMenu from "../../componenets/layout/UserMenu";
import Layout from "../../componenets/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { MdDelete } from "react-icons/md";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/order/user-order");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.post(`/api/v1/order/remove-order`, { orderId });
            getOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };


    useEffect(() => {
        if (auth?.token) {
            getOrders();
        }
    }, [auth?.token]);

    useEffect(() => {
        console.log(Array.isArray(orders[0]?.productId));
    }, [orders]);

    return (
        <Layout title={"Your Orders"}>
            <div className="container-fluid p-3 m-3 dashboard">
                <div className="row" style={{ alignItems: 'flex-start' }}>

                    <div className="col-md-3 mt-5">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Orders</h1>
                        {Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((o, i) => (
                                <div className="border shadow" key={o._id}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Order Date</th>
                                                <th scope="col">Delivery Date</th>
                                                <th scope="col">Delivery</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.userId?.name}</td>

                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{moment(o?.delivery).format("MMMM D, YYYY")}</td>
                                                <td>{o?.deliverystatus}</td>
                                                <td>{o?.quantity}</td>
                                                <td> {(o?.deliverystatus != "cancel") ? (
                                                    <MdDelete onClick={() => handleDeleteOrder(o._id)} />
                                                ) : (
                                                    <MdDelete style={{ color: 'red', cursor: 'not-allowed' }} />
                                                )}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {Array.isArray(o?.productId) &&
                                            Array.from(o?.productId).map((p, j) => (
                                                <div className="row mb-2 p-3 flex-row border" key={p._id}>
                                                    <div className="col-md-4">
                                                        <img
                                                            src={`/api/v1/product/product-photo/${p._id}`}

                                                            alt={p.name}
                                                            width="200px"
                                                            height="200px"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 ">
                                                        <p>{p.name}</p>
                                                        <p>{p.description.substring(0, 30)}</p>
                                                        <p>Price: {p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No orders available.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Order;
