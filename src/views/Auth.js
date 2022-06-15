import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import {AuthContext} from '../contexts/authContext'
import {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import LoadingSpinner from '../components/items/LoadingSpinner'

function Auth({authRoute}) {

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body

    if(authLoading) {
        body = (
            <LoadingSpinner />
        )
    } else {
        if(isAuthenticated) {
            return <Redirect to='/' />
        }

        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </>
        )
    } 

    return (
        <>
            <div className=''>
                {body}
            </div>
        </>
    )
}

export default Auth