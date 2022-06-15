import {Route,Redirect} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import LoadingSpinner from '../items/LoadingSpinner'
import LogoNav from '../layout/LogoNav'
import ScrollToTop from './ScrollToTop'
import Footer from '../layout/Footer'

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
            <div className="flex justify-center">
                <div className="sm:w-[70rem]">
                    <ScrollToTop />
                    <LogoNav />
                    <Component {...rest} {...props} /> 
                    <Footer />
                </div>
            </div>
        </>) : (
            <div>
                Không có quyền
            </div>
        )} />
    )
}

export default TeacherRoute
