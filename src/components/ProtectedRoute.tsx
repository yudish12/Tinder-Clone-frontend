
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
        console.log(import.meta.env.VITE_DEV_API_URI)
        const checkUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_DEV_API_URI}/api/auth/check/${usertoken}`)
                console.log(res, 19)
                if (res.status === 200) {
                    console.log(res)
                    console.log("done")
                    setisloggedIn(true);
                    setLoading(false);
                } else {
                    localStorage.clear()
                    setLoading(false);
                }
            } catch (error:unknown) {
                console.log(error)
                if(error.response.data.message ==="invalid signature"){
                    localStorage.clear()
                    setLoading(false)
                    navigate('/landing')
                }
            }

        }
        if (usertoken) {
            console.log(usertoken);
            checkUser();
        } else {
            console.log(usertoken)
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