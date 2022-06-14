import { Link, Redirect } from "react-router-dom"
import {AuthContext} from '../../contexts/authContext'
import {useContext} from 'react'
import LoadingSpinner from "../items/LoadingSpinner"

const NavbarUI = () => {
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
                <Link to="/logout" className="rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Logout
                </Link>
            </div>
        )
    }
    if(user.admin === 1) {
        nav = (
            <div className="flex justify-center font-medium">
                <Link to="/logout" className="rounded-md border-2 border-orange-400 p-1 text-orange-400">
                    Logout
                </Link>
            </div>
        )
    }

    const navlist = [
        {
            name:'Homepage',
            href:'/'
        },
        {
            name:'Questions',
            href:'/questions'
        },
        {
            name:'Thematics',
            href:'/thematics'
        },
        {
            name:'Tasks',
            href:'/tasks'
        },
        {
            name:'Lessons',
            href:'/lessons'
        }
    ]

    return (
        <>
            <div className="text-center border-b-2 py-3">
                <div className="font-extrabold text-5xl pb-2">
                    Stexam
                </div>

                <div className="flex justify-center font-medium">
                    {nav}
                </div>
            </div>

            <div className="mt-3 flex justify-around text-center">
                {
                    navlist.map(nav => (
                        <Link to={nav.href} className="transition duration-200 border-2 border-transparent hover:border-b-orange-400 text-black">
                            {nav.name}
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default NavbarUI
