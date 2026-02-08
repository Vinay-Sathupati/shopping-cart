import { useEffect, useState } from "react"
import api from "../../api"
import {toast} from 'react-toastify'
import { Link } from "react-router-dom"
import Navbar from "../Navbar"

import './index.css'

const apiStatusConstants = {
    success: "SUCCESS",
    empty: "EMPTY",
    failure: "FAILURE",
    inProgress: "IN_PROGRESS"
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress)

    useEffect(()=>{
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders")

                if (!res.data || res.data.length === 0) {
                    setApiStatus(apiStatusConstants.empty)
                } else {
                    setOrders(res.data)
                    setApiStatus(apiStatusConstants.success)
                }
            } catch {
                toast.error("Failed to load orders")
                setApiStatus(apiStatusConstants.failure)
            }
        }

        fetchOrders()
    },[])


    const renderLoadingView = () => (
        <div className="loader-container">
            <p>Loading orders...</p>
        </div>
    )

    const renderEmptyView = () => (
        <div className="cart-empty-view-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                className="cart-empty-img"
                alt="cart empty"
            />
            <h1 className="cart-empty-heading">No orders placed yet</h1>

            <Link to="/products">
                <button type="button" className="shop-now-btn">
                    Shop Now
                </button>
            </Link>
        </div>
    )

    const renderFailureView = () => (
        <div className="products-error-view-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
                alt="all-products-error"
                className="products-failure-img"
            />
            <h1 className="product-failure-heading-text">
                Oops! Something Went Wrong
            </h1>
            <p className="products-failure-description">
                We are having some trouble processing your request.<br/> Please try again.
            </p>
        </div>
    );

    const renderOrdersList = () => (
        <div className="orders-content-container">
            <h2 className="orders-heading">Order History</h2>

            <ul className="orders-list">
                {
                    orders.map(order => (
                        <li key={order._id} className="orders-item">
                            <div className="order-item-oredr-id">
                                <p>
                                    <strong>Order ID:</strong> {order._id}
                                </p>
                                <p>
                                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <ul className="cart-list">
                                {order.items.map(item => {
                                    const {_id, title, brand, price, imageUrl} = item.itemId
                                    return (
                                        <li className="cart-item" key={_id}>
                                            <img className="cart-product-image" src={imageUrl} alt={title} />
                                            <div className="cart-item-details-container">
                                                <div className="cart-product-title-brand-container">
                                                    <p className="cart-product-title">{title}</p>
                                                    <p className="cart-product-brand">by {brand}</p>
                                                </div>
                                                
                                                <div className="total-price-remove-container">
                                                    <p className="cart-total-price">Rs {price}/-</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

    const renderOrders = () => {
        switch (apiStatus) {
            case apiStatusConstants.inProgress:
                return renderLoadingView();
            case apiStatusConstants.empty:
                return renderEmptyView();
            case apiStatusConstants.success:
                return renderOrdersList();
            case apiStatusConstants.failure:
                return renderFailureView()
            default:
                return null;
        }
    }

    return (
        <>
            <Navbar />
            <div className="orders-container">
                {renderOrders()}
            </div>
        </>
    )
}

export default Orders