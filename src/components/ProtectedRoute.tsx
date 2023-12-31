
import { ReactNode, useEffect, useState } from 'react'
import { useAppSlector } from '../redux/store'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { token } = useAppSlector((state) => state.authSliceReducer)
    let usertoken = token
    if (!token) usertoken = JSON.parse(localStorage.getItem('user')!)?.token
    const [isloggedIn, setisloggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/auth/check/${usertoken}`)

                if (res.status === 200) {
                    setisloggedIn(true);
                    setLoading(false);
                } else {
                    localStorage.clear()
                    setLoading(false);
                }
            } catch (error:unknown) {
                if(error.response.data.message ==="invalid signature"){
                    localStorage.clear()
                    setLoading(false)
                    navigate('/landing')
                }
            }

        }
        if (usertoken) {
            checkUser();
        } else {
            localStorage.clear()
            setLoading(false)
        }
    }, [usertoken])

    if (!isloggedIn && !loading) {
        return <Navigate to="/landing" />;
    }

    if (!isloggedIn && loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute