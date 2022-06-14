import {Route} from 'react-router-dom'
import ScrollToTop from '../routing/ScrollToTop'
import Footer from '../layout/Footer'
import NavbarUI from '../layout/NavbarUI'

const PublicRoute = ({component:Component,...rest}) => {
    return (
        <Route {...rest} render={props => {
            return (
            <>
                <div className="flex justify-center">
                    <div className="sm:w-[70rem]">
                        <ScrollToTop />
                        <NavbarUI />
                        <Component {...rest} {...props} /> 
                        <Footer />
                    </div>
                </div>
            </>
        )}} />
    )
}

export default PublicRoute
