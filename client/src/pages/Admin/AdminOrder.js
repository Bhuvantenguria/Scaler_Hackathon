import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../componenets/layout/AdminMenu";
import Layout from "../../componenets/layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
    const [auth, setAuth] = useAuth();
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "delivered",
        "cancel",
    ]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/order/all-order");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/order/status-order`, {
                orderId: orderId,
                status: value,
            });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={"All Orders Data"}>
            <div className="mt-5 row dashboard" style={{ alignItems: 'flex-start' }}>
                <div className="col-md-3 mt-5" >
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Orders</h1>
                    {orders?.map((o, i) => (
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>
                                            <Select
                                                bordered={false}
                                                onChange={(value) => handleChange(o._id, value)}
                                                defaultValue={o?.status}
                                                key={i}
                                            >
                                                {status.map((s, j) => (
                                                    <Option key={j} value={s}>
                                                        {s}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>{o?.userId?.name}</td>
                                        <td>{moment(o?.createdAt).fromNow()}</td>
                                        <td>{moment(o?.delivery).format("MMMM D, YYYY")}</td>
                                        <td>{o?.deliverystatus}</td>
                                        <td>{o?.quantity}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="container">
                                {Array.isArray(o?.productId) &&
                                    Array.from(o?.productId).map((p, j) => (
                                        <div className="row mb-2 p-3 flex-row border" key={p._id}>
                                            <div className="col-md-4">
                                                <img
                                                    src={`https://yoy.onrender.com/api/v1/product/product-photo/${p._id}`}

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
                    ))}
                    {orders?.length === 0 && <p>No orders available.</p>}
                </div>
            </div>
        </Layout >
    );
};

export default AdminOrders;
