import { useEffect, useState } from "react"
import {toast} from 'react-toastify'
import Navbar from "./Navbar"

import api from "../api"

import './index.css'


const ItemsList = () => {

    const [productsList, setProductsList] = useState([])
    const [addedItems, setAddedItems] = useState(new Set())

    useEffect(()=>{
        const fetchItems =async () =>{
            const res = await api.get("/items")
            console.log(res)
            setProductsList(res.data)
        }
        fetchItems()
    },[])


    const addToCart = async (product) => {
        try {
            await api.post("/cart", {
                itemId: product._id,
                name: product.title
            })

            setAddedItems(prev => new Set(prev).add(product._id))
        } catch (err) {
            if (err?.response?.status === 409) {
                toast.info("Item already in cart")
            } else {
                toast.error("unable to add item to cart")
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className="products-sections">
                <ul className="products-list">
                    {productsList.map(product => {
                        const {title, brand, imageUrl, rating, price, _id} = product
                        const isAdded = addedItems.has(_id)

                        return (
                            <li key={_id}>
                                <div className="each-item">
                                    <img src={imageUrl} className="thumbnail" alt={title}/>
                                    <h2 className="title">{title}</h2>
                                    <p className="brand">by {brand}</p>
                                    <div className="product-details">
                                        <p className="price">Rs {price}/-</p>
                                        <div className="rating-container">
                                            <p className="rating">{rating}</p>
                                            <img
                                            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                            alt="star"
                                            className="star"
                                            />
                                        </div>
                                        <button type="button" className={`add-item-btn ${isAdded? "added" : ""}`} onClick={()=>{addToCart(product)}} disabled={isAdded}>
                                            {isAdded? "Added" : "Add"}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )}
                    )}
                </ul>
            </div>
        </>
    )
}

export default ItemsList