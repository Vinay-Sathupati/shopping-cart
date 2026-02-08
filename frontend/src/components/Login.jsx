import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../api'
import { FaArrowRightToBracket } from "react-icons/fa6";
import {toast} from 'react-toastify'

import './index.css'

const Login = () => {
    const [user, setUser] = useState({email:"", password:""})
    
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const onLogin = async (event) => {
        event.preventDefault()
        
        setLoading(true)

        if (!user.email || !user.password) {
            toast.error("Please Enter Email and Password")
            setLoading(false)
            return
        }

        try {
            await api.post("/users/login", {...user})
            toast.success("Login successful")
            navigate("/", {replace: true})
        } catch (err) {
            if (err.response && err.response.status === 403) {
                return toast.error("You are already logged in on another device.")
            }
            toast.error(err?.response?.data?.message || "Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field, value) => {
        setUser(prev => ({...prev, [field]: value}))
    }

    return (
        <div className="main-form-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                className="login-img"
                alt="website image"
            />
            <form className="form-container" onSubmit={onLogin}>
                <h2 className="form-title">Welcome back</h2>
                <p className="form-subtitle">Sign in to continue shopping.</p>
                <div className="input-container">
                    <input className="input-field" id='login-email-field' type='email' required name="email" value={user.email} onChange={e=> handleChange(e.target.name, e.target.value)} placeholder=" " />
                    <label className='input-label' htmlFor='login-email-field'>Email Address</label>
                </div>
                <div className="input-container">
                    <input className="input-field" id='login-password-field' type='password' required name="password" value={user.password} onChange={e=> handleChange(e.target.name, e.target.value)} placeholder=" " />
                    <label className='input-label' htmlFor='login-password-field'>Password</label>
                </div> 
                <button type="submit" className="login-button">
                    <span>{loading? "Logging In..." : "Login"}</span>
                    <span>{!loading && <FaArrowRightToBracket className="login-icon" />}</span>
                </button>
                <p className="auth-switch-txt">Don't have an account?{" "}
                    <Link to="/register" className="auth-link-styling">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login