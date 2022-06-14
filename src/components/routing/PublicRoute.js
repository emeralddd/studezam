import {Route} from 'react-router-dom'
import Footer from '../layout/Footer'
import NavbarUI from '../layout/NavbarUI'
const PublicRoute = ({component:Component,...rest}) => {

    return (
        <Route {...rest} render={props => {
            return (
            <>
                <div className="flex justify-center">
                    <div className="sm:w-[70rem]">
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
