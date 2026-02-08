import { useEffect, useState } from "react";
import {Navigate} from 'react-router-dom'
import api from '../api'

const ProtectedRoute = ({children}) => {
    const [authorized, setAuthorized] = useState(null)

    useEffect(()=> {
        const checkAuth = async () => {
            try {
                await api.get("/cart")
                setAuthorized(true)
            } catch (err) {
                if (err?.response?.status === 401) {
                    setAuthorized(false)
                } else {
                    setAuthorized(false)
                }
            }
        }

        checkAuth()
    },[])

    if (authorized === null) {
        return <p>Checking authentication...</p>
    }

    return authorized ? children: <Navigate to="/login" replace />
}

export default ProtectedRoute