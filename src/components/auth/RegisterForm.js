import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {

    const {registerUser} = useContext(AuthContext)

    const [registerForm,setRegisterForm] = useState({
        username: '',
        password: '',
        email: '',
        fullName: ''
    })

    const [error,setError] = useState("")

    const {username,password,fullName,email} = registerForm

    const onChangeregisterForm = event => {
        setRegisterForm({...registerForm, [event.target.name]:event.target.value})
        if(event.target.value === '') setError("")
    }

    const register = async event => {
        event.preventDefault()

        try {
            const registerData = await registerUser(registerForm)
            if(!registerData.success) {
                setError(registerData.message)
            }
        } catch (error) {
            setError(error)
            // console.log(error)
        } 
    }

    return (
    <>
        <div className="min-h-screen bg-[#F8F8F8] flex justify-center items-center">
            <div className="max-h-[90vh] max-w-[90vw] flex flex-1 shadow-xl rounded-xl bg-white">
                <img className="object-cover rounded-xl w-1/2" src="https://i.pinimg.com/564x/2b/c5/a9/2bc5a96b5e4322bf9684bbd137288124.jpg" />
                
                <div className="flex flex-col content-around flex-1 rounded-r-md p-8 justify-center gap-2">
                    <div className="text-4xl mb-3 font-bold">
                        Register
                    </div>

                    <div className="text-xl font-medium"  >
                        Email
                        <span className='text-sm text-red-500 ml-3'>
                            {error}
                        </span>
                    </div>

                    <div>
                        <input className="font-light border-2 w-full p-2 rounded-md" name='email' value={email} onChange={onChangeregisterForm} placeholder="Enter your email" />
                    </div>

                    <div className="text-xl font-medium" name='username'>
                        Username
                        <span className='text-sm text-red-500 ml-3'>
                            {error}
                        </span>
                    </div>

                    <div>
                        <input className="font-light border-2 w-full p-2 rounded-md text-sm" name='username' value={username} onChange={onChangeregisterForm} placeholder="Enter your username" />
                    </div>

                    <div className="text-xl font-medium">
                        Password
                        <span className='text-sm text-red-500 ml-3'>
                            {error}
                        </span>
                    </div>

                    <div>
                        <input type='password' className="font-light border-2 w-full p-2 rounded-md text-sm" value={password} name='password' placeholder="Enter your password" onChange={onChangeregisterForm} />
                    </div>

                    <div className="text-xl font-medium">
                        Full Name
                        <span className='text-sm text-red-500 ml-3'>
                            {error}
                        </span>
                    </div>

                    <div>
                        <input className="font-light text-sm border-2 w-full p-2 rounded-md mb-2" value={fullName} name='fullName' placeholder="Enter your full name" onChange={onChangeregisterForm} />
                    </div>

                    <button type='submit' className="transition duration-300 bg-orange-400 p-2 text-xl text-center rounded-md hover:bg-white border-2 hover:border-orange-300" onClick={register}>
                        Sign up
                    </button>

                    <div className="font-light text-xs mb-2 " onClick={register}>
                        Note: By register your account, you had accepted your Privacy Policy and Term of Use
                    </div>

                    <Link to='/login'>
                        <div className="transition duration-300 border-orange-400 hover:border-white hover:bg-orange-400 border-2 p-2 text-xl text-center rounded-md flex items-center justify-center text-black">
                            <div className="text-sm">
                                Already have account?
                            </div>
                            <div className="text-xl ml-1">
                            Login now
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </>)
}

export default RegisterForm
