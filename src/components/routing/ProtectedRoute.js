import {Route,Redirect} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import LoadingSpinner from '../items/LoadingSpinner'
import NavbarUI from '../layout/NavbarUI'
import Footer from '../layout/Footer'
import ScrollToTop from './ScrollToTop'

const ProtectedRoute = ({component:Component,...rest}) => {

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    
    if(authLoading) {
        return (
            <LoadingSpinner />
        )

    }

    return (
        <Route {...rest} render={props => isAuthenticated? (
        <>
            <div className="flex justify-center">
                <div className="sm:w-[70rem]">
                    <a name='top' />
                    <ScrollToTop />
                    <NavbarUI />
                    <Component {...rest} {...props} /> 
                    <Footer />
                </div>
            </div>
        </>) : (
            <Redirect to='/login' />
        )} />
    )
}

export default ProtectedRoute
