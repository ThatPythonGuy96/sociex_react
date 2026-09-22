import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import api from '../api';

function PrivateRoute({ children }) {
    const [Authenticated, setAuthenticated] = useState(null);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("refresh")
        try {
            const res = await api.post('api/user/auth/token/refresh/', {refresh: refreshToken})
            if (res.status === 200) {
                localStorage.setItem("access", res.data.access)
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        } catch (error) {
            console.log(error)
            setAuthenticated(false)
        }
    };

    const auth = async () => {
        const token = localStorage.getItem("access")
        if (token) {
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if (expiry_date < current_time){
                await refreshToken();
            } else {
                setAuthenticated(true)
            }
            
        } else {
            setAuthenticated(false)
        }
    };

    useEffect(() => {
        auth()
    }, [])

    if (Authenticated === null) {
        return <div>Loading...</div>
    }

    return Authenticated ? children : <Navigate to='/login' />;
}

export default PrivateRoute;