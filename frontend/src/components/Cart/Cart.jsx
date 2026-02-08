import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../api"
import { toast } from "react-toastify"
import Navbar from "../Navbar"
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

const apiStatusConstants = {
    empty: 'EMPTY',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const Cart = () => {

    const [cartList, setCartList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress)

    const navigate = useNavigate()

    useEffect(()=> {
        const fetchCart = async () => {
            try {
                const res  = await api.get("/cart")

                if (!res.data || res.data.items.length === 0) {
                    setApiStatus(apiStatusConstants.empty)
                } else {
                    const cartItems = res.data.items.map(cartItem => ({
                        cartItemId: cartItem._id,
                        itemId: cartItem.itemId._id,
                        title: cartItem.itemId.title,
                        brand: cartItem.itemId.brand,
                        price: cartItem.itemId.price,
                        imageUrl: cartItem.itemId.imageUrl
                    }));

                    setCartList(cartItems);
                    setApiStatus(apiStatusConstants.success);

                }
                
            } catch  {
                toast.error("Failed to load cart")
                setApiStatus(apiStatusConstants.failure)
            }
        }

        fetchCart()
    },[])

    const onRemoveAll = async () => {
        try {
            await api.delete("/cart")
            toast.success("Cart cleared")
            setCartList([])
            setApiStatus(apiStatusConstants.empty)
        } catch (err) {
            console.log(err)
            toast.error(err.response.message || "Unable to clear cart")
        }
    }

    const onRemoveItem = async (itemId) => {
        try {
            await api.delete(`/cart/item/${itemId}`)
            const updatedCartList = cartList.filter(
                item => item.itemId !== itemId
            )

            setCartList(updatedCartList)
            if (updatedCartList.length === 0) {
                setApiStatus(apiStatusConstants.empty)
            }

            toast.success("Item removed from cart")
        } catch (err) {
            toast.error(err?.response?.data?.message || "Unable to remove item")
        }
    }

    const totalPrice = cartList.reduce((total, item) => total + item.price ,0)

    const checkout = async () => {
        try {
            await api.post("/orders")
            toast.success("Order placed successfully")
            navigate("/orders")
        } catch (err) {
            if (err?.response?.status === 400) {
                toast.info(err.response.data.message);
            }
            toast.error("Unable to place order")
        }
    }

    const renderCartListView = () => {

        return (
            <div className="cart-content-container">
                <h2 className="cart-heading">My Cart</h2>
                <button type="button" className="remove-button" onClick={onRemoveAll}>Remove All</button>

                <ul className="cart-list">
                    {cartList.map(eachCartItem => {
                        const {itemId, title, brand, price, imageUrl} = eachCartItem
                        return (
                            <li className="cart-item" key={itemId}>
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
                                <button
                                    className="delete-button"
                                    type="button"
                                    onClick={() => onRemoveItem(itemId)}
                                >
                                    <AiFillCloseCircle color="#616E7C" size={20} />
                                </button>
                            </li>
                        )
                    })}
                </ul>

                <div className="summary-container">
                    <div className="summary-card-container">
                        <h1 className="order-total">
                            Order Total:{' '}
                            <span className="total-amount">Rs {totalPrice}/-</span>
                        </h1>
                        <p className="item-count">{cartList.length}{" "}{cartList.length===1? "item" : "items"} in cart</p>
                        <button type="button" className="checkout-button" onClick={checkout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const renderLoadingView = () => (
        <div className="loader-container">
            <p>Loading cart...</p>
        </div>
    )

    const renderEmptyView = () => (
        <div className="cart-empty-view-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                className="cart-empty-img"
                alt="cart empty"
            />
            <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

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


    const renderCart = () => {
        switch (apiStatus) {
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            case apiStatusConstants.success:
                return renderCartListView()
            case apiStatusConstants.failure:
                return renderFailureView()
            case apiStatusConstants.empty:
                return renderEmptyView()
            default:
                return null
        }
    }

    return (
        <>
            <Navbar />
            <div className="cart-container">
                {renderCart()}
            </div>
        </>
    )
}

export default Cart