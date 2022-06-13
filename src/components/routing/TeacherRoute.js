import {Route,Redirect} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import LoadingSpinner from '../items/LoadingSpinner'

const TeacherRoute = ({component:Component,...rest}) => {

    const {authState: {authLoading, user}} = useContext(AuthContext)
    
    if(authLoading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <Route {...rest} render={props => user && user.admin >= 2 ? (
        <>
            <Component {...rest} {...props} /> 
        </>) : (
            <p>
                Khong du quyen
            </p>
        )} />
    )
}

export default TeacherRoute
