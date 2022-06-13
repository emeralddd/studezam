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
            console.log(error)
        } 
    }

    return <>
    <Form onSubmit={register}>
        <p>
            Email
            <span className=' text-fuchsia-600'>{error}</span>
        </p>
        
        <Form.Group className='mb-3'>
            <Form.Control 
                type='text' 
                placeholder='Email'
                name='email' 
                required 
                value={email}
                onChange={onChangeregisterForm} />
        </Form.Group>

        <p>
            Username
            <span className=' text-fuchsia-600'>{error}</span>
        </p>
        
        <Form.Group className='mb-3'>
            <Form.Control 
                type='text' 
                placeholder='Username'
                name='username' 
                required 
                value={username}
                onChange={onChangeregisterForm} />
        </Form.Group>
        <p>
            Password
            <span className=' text-fuchsia-600'>{error}</span>
        </p>

        <Form.Group className='mb-3'>
            <Form.Control 
                type='password' 
                placeholder='Password'
                name='password' 
                required 
                value={password}
                onChange={onChangeregisterForm} />
        </Form.Group>
        
    

        <p>
            Full Name
            <span className=' text-fuchsia-600'>{error}</span>
        </p>
        
        <Form.Group className='mb-3'>
            <Form.Control 
                type='text' 
                placeholder='Full Name'
                name='fullName' 
                required 
                value={fullName}
                onChange={onChangeregisterForm} />
        </Form.Group>
        
        <Button className='mb-3' variant = 'success' type='submit'>register</Button>
    </Form>
    
    <p>
        <Link to='/'>
            <Button variant = 'info' size='sm' className='ml-2'>Quay Về Trang Chủ</Button>
        </Link>
    </p>
    </>
}

export default RegisterForm
