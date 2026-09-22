import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../api';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [Authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState([])

    const handleAuth = async () => {
        const token = localStorage.getItem("access")
        if (token) {
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if (expiry_date > current_time){
                setAuthenticated(true)
            } else {
                await refreshToken();
            }
        }
    }

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
            console.log(error.message)
            setAuthenticated(false)
        }
    }

    function get_user() {
        if(Authenticated){
            api.get('api/user/')
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
        }
        
    }

    useEffect(() => {
        handleAuth()
        get_user()        
    }, [Authenticated])

    const authValue = {Authenticated, user, setAuthenticated, get_user, refreshToken}

    return (
        <AuthContext.Provider value={authValue} >
            {children}
        </AuthContext.Provider>
    )
}