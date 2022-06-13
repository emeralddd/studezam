import { Link } from "react-router-dom"
import {AuthContext} from '../../contexts/authContext'
import {useContext} from 'react'

const NavbarPublic = () => {

    let dashboard=null
    let log = null

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    if(!authLoading) {
        if(isAuthenticated) {
            dashboard = (
                <>
                    <Link to='/dashboard'>
                        <p className="navpubitemseach">
                            Bảng Điều Khiển
                        </p>
                    </Link>
                </>
            )

            log = (
                <>
                    <Link to='/logout'>
                        <p className="navpubitemseach">
                            Đăng xuất
                        </p>
                    </Link>
                </>
            )
        } else {
            log = (
                <>
                    <Link to='/login'>
                        <p className="navpubitemseach">
                            Đăng nhập
                        </p>
                    </Link>
                </>
            )
        }
    }

    
    return (
        <>
            <div className="navpub">
                <div className="navpublogo">
                    <Link to='/'>
                        <img src="https://d33wubrfki0l68.cloudfront.net/ea8e37a6a30e9c260a8936d95c579af4a2dd3df7/6ee7e/img/docusaurus_keytar.svg" alt="" className="navpublogoimg" />
                    </Link>
                </div>

                <div className="navpubitems">
                    <a href="https://github.com/emeralddd" target='_blank'>
                        <p className="navpubitemseach">
                            Github
                        </p>
                    </a>
                    {dashboard}
                    {log}
                </div>
            </div>
        </>
    )
}

export default NavbarPublic
