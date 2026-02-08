import { Link } from 'react-router-dom'


import Navbar from './Navbar.jsx'

import './index.css'
const Home = () => {

    return (
        <>
            <Navbar />
            <div className="home-container">
                <div className="home-content">
                    <h1 className="home-heading">Style That Speaks Before YOU Do</h1>
                    <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                    alt="clothes that get you noticed"
                    className="home-mobile-img"
                    />
                    <p className="home-description">
                    Discover fashion that fits your personality, not just the season.
                    From everyday essentials to statement pieces, find styles that help
                    you stand out effortlessly. Dress confident. Dress bold. Dress you.
                    </p>
                    <Link to="/products">
                        <button type="button" className="shop-now-button">
                            Shop Now
                        </button>
                    </Link>
                </div>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                    alt="clothes that get you noticed"
                    className="home-desktop-img"
                />
            </div>
        </>
    )
}

export default Home