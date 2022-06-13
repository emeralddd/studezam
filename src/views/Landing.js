import { useContext } from 'react'
import {Link} from 'react-router-dom'
import LoadingSpinner from '../components/items/LoadingSpinner'
import Footer from '../components/layout/Footer'
import { AuthContext } from '../contexts/authContext'

const Landing = () => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    if(authLoading) {
        return <LoadingSpinner />
    }

    let nav = null

    if(isAuthenticated) {
        nav = (
            <Link to='/logout' class="bg-orange-400 text-white p-1 rounded-md">
                Logout
            </Link>
        )
    } else {
        nav = (
            <>
                <Link to='/login' class="p-1 mr-2 hover:text-orange-400">
                    Login
                </Link>

                <Link to='/register' class="bg-orange-400 text-white p-1 rounded-md">
                    Register
                </Link>
            </>
        )
    }

    return (
        <>
            <div class="flex justify-center">
                <div class="sm:max-w-[60rem]">
                    <div class="text-center border-b-2 py-3">
                        <div class="font-extrabold text-5xl pb-2">
                            VELTS
                        </div>

                        <div class="flex justify-center font-medium">
                            {nav}
                        </div>
                    </div>

                    <div class="py-16">
                        <div class="flex flex-col-reverse sm:flex-row items-center">
                            <div class="sm:w-1/3 text-center sm:text-left mt-3 sm:mt-0">
                                <div class="font-semibold text-4xl">
                                    LẤY ĐIỂM CAO KHÔNG KHÓ
                                </div>

                                <div class="my-2 font-light text-base sm:text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus felis in dictum dictum. Sed a lacinia mauris. Integer efficitur et tellus id elementum.
                                </div>
                            </div>

                            <div class="sm:pl-8 sm:w-2/3">
                                <img class="" src="https://s3-alpha-sig.figma.com/img/0719/c0c9/099ee2c24ac057eff8c9a3045da20004?Expires=1655683200&Signature=FSfMYC1Cs0UpVzrrTLyz~a~vo~YIZwctf7HaEVRiR~HWt9AaJTPlXE4LYLYgKUSxFcluC93xf092pGm~ofNtmwojdRu2ri6S6XUPa5Tt5hfsbD8w7yUbrRp6yVOaDA0BM9IgVQmzcHzudo1looW6ja6QOT5XUpcdNYIp1JHPrL8xM~vrggdZsQE6qChzmvRxzUhh4X-UGef-GKfET4fMLrYRsCxviohMS3QJNNCX3jGJGZ6bUC7JfNo2S~0R3aia3qfgd5lCV1sItkg4n1GbycVWNFzXEqugxh1eu2UH5Vji43k09mwPK6choudeVyFx7X8F7fmGkbI~aTyif1rHMg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                            </div>
                        </div>
                    </div>

                    <div class="py-16 border-t-2">
                        <div class="grid grid-cols-1 sm:grid-cols-3 grid-rows-3 sm:grid-rows-1 gap-6">
                            <div class="shadow-md flex flex-col p-6 justify-center items-center rounded-md">
                                <img src="https://s3-alpha-sig.figma.com/img/bf45/c511/570d5114c2eecbdde183e5be5d88a7a6?Expires=1655683200&Signature=UmLcL41a4ZYllvVA-nadUI2DtUDLyVOFfIeioCPM1gSL072NHEJ7iNjD-~pbvl41uw376N5MRPTOuYGJiGZvd7y-pdQ8sWwpU6oShNt7xeJRzlCON2d19SNO-Y5mUlLwb4fKxtiZoi6KKk0K2ab43pizPHJlReFrr7X0JcaatKhOD3lpEaE5U9L8U3dKJ3fkic3FJYWQH7~~zDDEfGUuN~Jn6WLqmERn7fn9-JP5fL6Fhb1tz1kPYMALLqZXRCunoBTXE1Oau927FQc0FH-XuG62OVf3foEX16GmUe3bM-3BEXzhFHehiwLO9NSOAYuUsn5jQkc3qHvWdiqQ-jCYtA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                <div class="text-xl font-semibold py-2">
                                    Low Minimum Orders
                                </div>
                                <div class="text-base sm:text-sm text-center font-light">
                                    Integer aliquam sapien urna, in placerat tellus malesuada ut. Morbi et purus consequat mauris pharetra porttitor. Suspendisse eu quam tincidunt.
                                </div>
                            </div>

                            <div class="shadow-md flex flex-col p-6 justify-center items-center rounded-md">
                                <img src="https://s3-alpha-sig.figma.com/img/bf45/c511/570d5114c2eecbdde183e5be5d88a7a6?Expires=1655683200&Signature=UmLcL41a4ZYllvVA-nadUI2DtUDLyVOFfIeioCPM1gSL072NHEJ7iNjD-~pbvl41uw376N5MRPTOuYGJiGZvd7y-pdQ8sWwpU6oShNt7xeJRzlCON2d19SNO-Y5mUlLwb4fKxtiZoi6KKk0K2ab43pizPHJlReFrr7X0JcaatKhOD3lpEaE5U9L8U3dKJ3fkic3FJYWQH7~~zDDEfGUuN~Jn6WLqmERn7fn9-JP5fL6Fhb1tz1kPYMALLqZXRCunoBTXE1Oau927FQc0FH-XuG62OVf3foEX16GmUe3bM-3BEXzhFHehiwLO9NSOAYuUsn5jQkc3qHvWdiqQ-jCYtA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                <div class="text-xl font-semibold py-2">
                                    Low Minimum Orders
                                </div>
                                <div class="text-base sm:text-sm text-center font-light">
                                    Integer aliquam sapien urna, in placerat tellus malesuada ut. Morbi et purus consequat mauris pharetra porttitor. Suspendisse eu quam tincidunt.
                                </div>
                            </div>

                            <div class="shadow-md flex flex-col p-6 justify-center items-center rounded-md">
                                <img src="https://s3-alpha-sig.figma.com/img/bf45/c511/570d5114c2eecbdde183e5be5d88a7a6?Expires=1655683200&Signature=UmLcL41a4ZYllvVA-nadUI2DtUDLyVOFfIeioCPM1gSL072NHEJ7iNjD-~pbvl41uw376N5MRPTOuYGJiGZvd7y-pdQ8sWwpU6oShNt7xeJRzlCON2d19SNO-Y5mUlLwb4fKxtiZoi6KKk0K2ab43pizPHJlReFrr7X0JcaatKhOD3lpEaE5U9L8U3dKJ3fkic3FJYWQH7~~zDDEfGUuN~Jn6WLqmERn7fn9-JP5fL6Fhb1tz1kPYMALLqZXRCunoBTXE1Oau927FQc0FH-XuG62OVf3foEX16GmUe3bM-3BEXzhFHehiwLO9NSOAYuUsn5jQkc3qHvWdiqQ-jCYtA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                                <div class="text-xl font-semibold py-2">
                                    Low Minimum Orders
                                </div>
                                
                                <div class="text-base sm:text-sm text-center font-light">
                                    Integer aliquam sapien urna, in placerat tellus malesuada ut. Morbi et purus consequat mauris pharetra porttitor. Suspendisse eu quam tincidunt.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="py-16">
                        <div class="flex flex-col sm:flex-row items-center">
                            <div class="sm:pr-8 sm:w-1/2">
                                <img class="rounded-md shadow-lg" src="https://s3-alpha-sig.figma.com/img/1ec0/f4e2/edec785291ce7dca1281a2ceeb35e515?Expires=1655683200&Signature=WJA9~ZwS-U5S19Oe5Nm6aE70X8inHO7K9DQauqzsOoqGmbzgPU1PWzwWYU-CzHpoQO0pdBO6BDvdZ7Ws~O1FVedO344r~vVIrXmL4Ko-154UqThJ0XoErfazq1L--OPncve360OVBrT8TRBn6IBm-I~jpKIwJNRHV4pwKr9GWE80oYrwU06Q5FQZl1zrEUK4j79b-dhNksSk~EIVBOjOxRcXLJsxe4NOjAPdMsMn91S39ibUNk0cZUo1vXm519m9~qXihY5FS7yiHLHcqnoX4mj~F2KwP~GFqpzXu3r50rJcmKJw~fVxz0yy~CNGolWCiGQYvrF5bQ50vaikjs-mJQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                            </div>

                            <div class="sm:w-1/2 sm:text-left mt-3 sm:mt-0">
                                <div class="font-semibold text-4xl">
                                    Praesent ullamcorper sagittis nibh semper ornare.
                                </div>

                                <div class="my-2 font-light text-base sm:text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus felis in dictum dictum. Sed a lacinia mauris. Integer efficitur et tellus id elementum.
                                </div>

                                <div class="my-3">
                                    <a href="#">
                                        <div class="shadow py-2 px-3 w-fit text-orange-400 hover:bg-orange-400 hover:text-white border-2 font-bold">
                                        Find more
                                    </div>
                                    </a>
                                </div>
                            </div>        
                        </div>
                    </div>

                    <div class="py-16">
                        <div class="flex flex-col-reverse sm:flex-row items-center">
                            <div class="sm:w-1/2 sm:text-left mt-3 sm:mt-0">
                                <div class="font-semibold text-4xl">
                                    Praesent ullamcorper sagittis nibh semper ornare.
                                </div>

                                <div class="my-2 font-light text-base sm:text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus felis in dictum dictum. Sed a lacinia mauris. Integer efficitur et tellus id elementum.
                                </div>

                                <div class="my-3">
                                    <a href="#">
                                        <div class="shadow py-2 px-3 w-fit text-orange-400 hover:bg-orange-400 hover:text-white border-2 font-bold">
                                            Find more
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="sm:pl-8 sm:w-1/2">
                                <img class="rounded-md shadow-lg" src="https://s3-alpha-sig.figma.com/img/1ec0/f4e2/edec785291ce7dca1281a2ceeb35e515?Expires=1655683200&Signature=WJA9~ZwS-U5S19Oe5Nm6aE70X8inHO7K9DQauqzsOoqGmbzgPU1PWzwWYU-CzHpoQO0pdBO6BDvdZ7Ws~O1FVedO344r~vVIrXmL4Ko-154UqThJ0XoErfazq1L--OPncve360OVBrT8TRBn6IBm-I~jpKIwJNRHV4pwKr9GWE80oYrwU06Q5FQZl1zrEUK4j79b-dhNksSk~EIVBOjOxRcXLJsxe4NOjAPdMsMn91S39ibUNk0cZUo1vXm519m9~qXihY5FS7yiHLHcqnoX4mj~F2KwP~GFqpzXu3r50rJcmKJw~fVxz0yy~CNGolWCiGQYvrF5bQ50vaikjs-mJQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                            </div>  
                        </div>
                    </div>

                    <div class="py-16">
                        <div class="shadow-xl p-6 flex flex-col justify-center items-center">
                            <div class="text-4xl font-semibold">
                            GET READY?
                            </div>

                            <div class="text-2xl font-medium my-3">
                            THE THPTQG CONTEST IS COMMING SOON!!!
                            </div>

                            <div class="">
                                <a href="#">
                                    <div class="shadow py-4 px-7 w-fit bg-orange-400 text-white border-2 text-3xl font-bold">
                                        Register now to Testing
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <Footer />

                </div>
            </div>
        </>
    )
}

export default Landing