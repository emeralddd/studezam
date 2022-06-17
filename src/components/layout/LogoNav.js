import { Link, Redirect } from "react-router-dom"
import {AuthContext} from '../../contexts/authContext'
import {useContext} from 'react'
import LoadingSpinner from "../items/LoadingSpinner"

const LogoNav = () => {
    const {authState: {authLoading, isAuthenticated, user}} = useContext(AuthContext)

    let nav = null

    if(authLoading) {
        return <LoadingSpinner />
    } else {
        if(!isAuthenticated) {
            return <Redirect to='/landing' />
        }
    }

    if(user.admin === 3) {
        nav = (
            <div className="flex justify-center font-medium">
                <Link to="/admin" className="rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Admin
                </Link>
                <Link to="/teacher" className="mx-3 rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Teacher
                </Link>
                <Link to='/' className="mr-3 rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Trang người dùng
                </Link>
                <Link to="/logout" className="rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Logout
                </Link>
            </div>
        )
    } 
    if(user.admin === 2) {
        nav = (
            <div className="flex justify-center font-medium">
                <Link to="/teacher" className="mx-3 rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Teacher
                </Link>
                <Link to='/' className="mr-3 rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Trang người dùng
                </Link>
                <Link to="/logout" className="rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Logout
                </Link>
            </div>
        )
    }
    if(user.admin === 1) {
        nav = (
            <div className="flex justify-center font-medium">
                <Link to='/' className="mr-3 rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Trang người dùng
                </Link>
                <Link to="/logout" className="rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Logout
                </Link>
            </div>
        )
    }

    return (
        <>
            <div className="text-center border-b-2 py-3">
                <div className="font-extrabold text-5xl pb-2">
                    STUDEZAM
                </div>

                <div className="flex justify-center font-medium">
                    {nav}
                </div>
            </div>
        </>
    )
}

export default LogoNav