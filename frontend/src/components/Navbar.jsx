import {useNavigate, Link} from 'react-router-dom'
import api from '../api'
import {toast} from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate()
    
    const onClickLogout = async () => {
        try {
            await api.post("/users/logout")
            navigate("/login", {replace: true})
        } catch (err) {
            console.log(err?.response?.data?.message)
            toast.error("Logout failed")
        }
    }

    return (
        <>
            <nav className="nav-header">
                <div className="nav-content">
                    <div className="nav-bar-mobile-logo-container">
                        
                        <button
                            type="button"
                            className="nav-mobile-btn"
                            onClick={onClickLogout}
                        >
                            <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                            alt="nav logout"
                            className="nav-bar-img"
                            />
                        </button>
                    </div>

                    <div className="nav-bar-large-container">
                        <ul className="nav-menu">
                            <li className="nav-menu-item">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-menu-item">
                                <Link to="/orders" className="nav-link">
                                    Orders
                                </Link>
                            </li>

                            <li className="nav-menu-item">
                                <Link to="/cart" className="nav-link">
                                    Cart
                                </Link>
                            </li>
                        </ul>
                        <button
                            type="button"
                            className="logout-desktop-btn"
                            onClick={onClickLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="nav-menu-mobile">
                    <ul className="nav-menu-list-mobile">
                        <li className="nav-menu-item-mobile">
                            <Link to="/" className="nav-link">
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                                    alt="nav home"
                                    className="nav-bar-img"
                                />
                            </Link>
                        </li>

                        <li className="nav-menu-item-mobile">
                            <Link to="/orders" className="nav-link">
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                                    alt="nav products"
                                    className="nav-bar-img"
                                />
                            </Link>
                        </li>
                        <li className="nav-menu-item-mobile">
                            <Link to="/cart" className="nav-link">
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                                    alt="nav cart"
                                    className="nav-bar-img"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar