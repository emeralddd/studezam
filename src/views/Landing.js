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
            <>
                <Link to='/' className="bg-orange-400 text-white p-1 mr-2 rounded-md">
                    Trang người dùng
                </Link>

                <Link to='/logout' className="bg-orange-400 text-white p-1 rounded-md">
                    Đăng xuất
                </Link>
            </>
            
        )
    } else {
        nav = (
            <>
                <Link to='/login' className="p-1 mr-2 hover:text-orange-400">
                    Đăng nhập
                </Link>

                <Link to='/register' className="bg-orange-400 text-white p-1 rounded-md">
                    Đăng ký
                </Link>
            </>
        )
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="sm:max-w-[60rem]">
                    <div className="text-center border-b-2 py-3">
                        <div className="font-extrabold text-5xl pb-2">
                            STUDEZAM
                        </div>

                        <div className="flex justify-center font-medium">
                            {nav}
                        </div>
                    </div>

                    <div className="py-16">
                        <div className="flex flex-col-reverse sm:flex-row items-center">
                            <div className="sm:w-1/3 text-center sm:text-left mt-3 sm:mt-0">
                                <div className="font-semibold text-4xl">
                                    LẤY ĐIỂM CAO KHÔNG KHÓ
                                </div>

                                <div className="my-2 font-light text-base sm:text-sm">
                                    Học sinh có thể tin tưởng và lựa chọn kiến thức từ những bài giảng trên website để bổ túc kiến thức Tiếng Anh của mình. Mọi thông tin hoặc tài liệu đều được kiểm tra kỹ lưỡng.
                                </div>
                            </div>

                            <div className="sm:pl-8 sm:w-2/3">
                                <img className="" src="https://s3-alpha-sig.figma.com/img/0719/c0c9/099ee2c24ac057eff8c9a3045da20004?Expires=1655683200&Signature=FSfMYC1Cs0UpVzrrTLyz~a~vo~YIZwctf7HaEVRiR~HWt9AaJTPlXE4LYLYgKUSxFcluC93xf092pGm~ofNtmwojdRu2ri6S6XUPa5Tt5hfsbD8w7yUbrRp6yVOaDA0BM9IgVQmzcHzudo1looW6ja6QOT5XUpcdNYIp1JHPrL8xM~vrggdZsQE6qChzmvRxzUhh4X-UGef-GKfET4fMLrYRsCxviohMS3QJNNCX3jGJGZ6bUC7JfNo2S~0R3aia3qfgd5lCV1sItkg4n1GbycVWNFzXEqugxh1eu2UH5Vji43k09mwPK6choudeVyFx7X8F7fmGkbI~aTyif1rHMg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                            </div>
                        </div>
                    </div>

                    <div className="py-16 border-t-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-3 sm:grid-rows-1 gap-6">
                            <div className="shadow-md flex flex-col p-6 justify-center items-center rounded-md">
                                <img src="https://s3-alpha-sig.figma.com/img/bf45/c511/570d5114c2eecbdde183e5be5d88a7a6?Expires=1655683200&Signature=UmLcL41a4ZYllvVA-nadUI2DtUDLyVOFfIeioCPM1gSL072NHEJ7iNjD-~pbvl41uw376N5MRPTOuYGJiGZvd7y-pdQ8sWwpU6oShNt7xeJRzlCON2d19SNO-Y5mUlLwb4fKxtiZoi6KKk0K2ab43pizPHJlReFrr7X0JcaatKhOD3lpEaE5U9L8U3dKJ3fkic3FJYWQH7~~zDDEfGUuN~Jn6WLqmERn7fn9-JP5fL6Fhb1tz1kPYMALLqZXRCunoBTXE1Oau927FQc0FH-XuG62OVf3foEX16GmUe3bM-3BEXzhFHehiwLO9NSOAYuUsn5jQkc3qHvWdiqQ-jCYtA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" className='object-cover w-full h-40' />
                                <div className="text-xl font-semibold py-2">
                                    Chất lượng
                                </div>
                                <div className="text-base sm:text-sm text-center font-light">
                                    Nguồn đề của website được xây dựng dựa trên các đề minh họa, đề thi chính thức hay đề thi phát triển từ đề minh họa của các trường có uy tín trên cả nước.
                                </div>
                            </div>

                            <div className="shadow-md flex flex-col p-6 justify-center items-center rounded-md">
                                <img src="https://i.pinimg.com/564x/6c/51/71/6c517192543887c7db2f032a991e1003.jpg" className='object-cover w-full h-40' />
                                <div className="text-xl font-semibold py-2">
                                    Đầy đủ
                                </div>
                                <div className="text-base sm:text-sm text-center font-light">
                                    Kiến thức được tổng hợp tại website có tính tổng quát cho đến cụ thể, được sắp xếp theo từng chuyên đề, dạng bài. Luôn được cập nhật và chỉnh sửa để luôn là phiên bản tốt nhất cho học sinh.
                                </div>
                            </div>

                            <div className="shadow-md flex flex-col p-6 justify-center items-center rounded-md">
                                <img src="https://i.pinimg.com/736x/47/12/69/471269b2b0af6839a4671d2488923db1.jpg" className='object-cover w-full h-40' />
                                <div className="text-xl font-semibold py-2">
                                    Miễn phí
                                </div>
                                
                                <div className="text-base sm:text-sm text-center font-light">
                                    Học sinh sẽ không cần bỏ thêm một chút tiền nào để sử dụng toàn bộ chức năng trên website. Chỉ cần một tài khoản là có thể làm hàng chục, trăm đề trên website.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-16">
                        <div className="flex flex-col sm:flex-row items-center">
                            <div className="sm:pr-8 sm:w-1/2">
                                <img className="rounded-md shadow-lg" src="https://s3-alpha-sig.figma.com/img/1ec0/f4e2/edec785291ce7dca1281a2ceeb35e515?Expires=1655683200&Signature=WJA9~ZwS-U5S19Oe5Nm6aE70X8inHO7K9DQauqzsOoqGmbzgPU1PWzwWYU-CzHpoQO0pdBO6BDvdZ7Ws~O1FVedO344r~vVIrXmL4Ko-154UqThJ0XoErfazq1L--OPncve360OVBrT8TRBn6IBm-I~jpKIwJNRHV4pwKr9GWE80oYrwU06Q5FQZl1zrEUK4j79b-dhNksSk~EIVBOjOxRcXLJsxe4NOjAPdMsMn91S39ibUNk0cZUo1vXm519m9~qXihY5FS7yiHLHcqnoX4mj~F2KwP~GFqpzXu3r50rJcmKJw~fVxz0yy~CNGolWCiGQYvrF5bQ50vaikjs-mJQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                            </div>

                            <div className="sm:w-1/2 sm:text-left mt-3 sm:mt-0">
                                <div className="font-semibold text-4xl">
                                    Tổng hợp kiến thức đầy đủ
                                </div>

                                <div className="my-2 font-light text-base sm:text-sm">
                                    Mọi kiến thức từ cơ bản đến nâng cao có mặt trong ma trận đề thi của Bộ GD&ĐT giúp học sinh có thể dễ dàng tiếp cận. Ngoài ra, sau mỗi bài học, học sinh hoàn toàn có thể giải quyết các bài tập trắc nghiệm liên quan có trên website.
                                </div>

                                <div className="my-3">
                                    <Link to="/register">
                                        <div className="shadow py-2 px-3 w-fit text-orange-400 hover:bg-orange-400 hover:text-white border-2 font-bold">
                                        Tìm hiểu thêm?
                                    </div>
                                    </Link>
                                </div>
                            </div>        
                        </div>
                    </div>

                    <div className="py-16">
                        <div className="flex flex-col-reverse sm:flex-row items-center">
                            <div className="sm:w-1/2 sm:text-left mt-3 sm:mt-0">
                                <div className="font-semibold text-4xl">
                                    Thi thử THPT
                                </div>

                                <div className="my-2 font-light text-base sm:text-sm">
                                    Học sinh có thể sử dụng chức năng tự tạo đề của website, đây là đề được hệ thống tự sinh ngẫu nhiên giúp học sinh được làm những đề mới hoàn toàn, không trùng lặp.
                                </div>

                                <div className="my-3">
                                    <Link to="/register">
                                        <div className="shadow py-2 px-3 w-fit text-orange-400 hover:bg-orange-400 hover:text-white border-2 font-bold">
                                            Tìm hiểu thêm?
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="sm:pl-8 sm:w-1/2">
                                <img className="rounded-md shadow-lg" src="https://www.youstudy.com/gallery/blog/post/study-english-at-education-first.jpg" alt=""/>
                            </div>  
                        </div>
                    </div>

                    <div className="py-16">
                        <div className="shadow-xl p-6 flex flex-col justify-center items-center">
                            <div className="text-4xl font-semibold">
                                CÒN CHẦN CHỜ GÌ NỮA?
                            </div>

                            <div className="text-2xl font-medium my-3">
                                KỲ THI TỐT NGHIỆP THPTQG ĐANG ĐẾN GẦN!
                            </div>

                            <div className="">
                                <Link href="/register">
                                    <div className="shadow py-4 px-7 w-fit bg-orange-400 text-white border-2 text-3xl font-bold">
                                        Đăng ký ngay để Thi thử
                                    </div>
                                </Link>
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