import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { DataContext } from "../contexts/dataContext"
import Toast from 'react-bootstrap/Toast'
import LessonButton from "../components/items/LessonButton"
import UpdateLessonModal from "../components/form/UpdateLessonModal"

const LessonsManager = (props) => {
    const {
        lessonState: {
            lessonLoading,
            lessons
        },
        getLessons,
        addLesson,
        showDataToast: {
            show,
            message,
            type
        },
        setShowDataToast
    } = useContext(DataContext)

    useEffect(() => {
        getLessons()
    },[])

    const [newData, setNewData] = useState({
        tag:'',
        title:'',
        content:''
    })

    if(lessonLoading) {
        return <LoadingSpinner />
    }

    const {tag,title,content} = newData

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await addLesson(newData)
        setShowDataToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		if(success) resetNewData()
	}

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const resetNewData = () => {
		setNewData({
            tag:'',
            title:'',
            content:''
        })
	}

    if(props.match.path === '/teacher/:action/add') {
        return (
            <>
                <Toast
                    show={show}
                    style={{ 
                        position: 'fixed', 
                        top: '15%', 
                        right: '15px' 
                    }}
                    className={`bg-${type} text-white`}
                    onClose={setShowDataToast.bind(this, {
                        show: false,
                        message: '',
                        type: null
                    })}
                    delay={2000}
                    autohide
                >
                    <Toast.Body>
                        <div className="font-semibold">{message}</div>
                    </Toast.Body>
                </Toast>

                <div className="py-10 text-4xl font-semibold text-center">
                    Thêm bài giảng
                </div>

                <Link to='/teacher/lessonsmanager'>
                    <div className="shadow-lg text-center mb-4 mx-auto p-3 w-fit ">
                        Trở lại trang quản lý
                    </div>
                </Link>

                <div className='font-medium text-lg'>
                    Tag
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='text'  name='tag' value={tag} onChange={onChangeDataForm} />
                
                <div className='font-medium text-lg'>
                    Tiêu đề
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='text' name='title' value={title} onChange={onChangeDataForm} />

                <div className='font-medium text-lg'>
                    Nội dung
                </div>
                <textarea className="font-light border-2 w-full p-2 rounded-md" name='content' value={content} onChange={onChangeDataForm} rows='20' />
                
                <button className='my-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400' type='submit' onClick={onSubmit}>
					Thêm
				</button>
            </>
        )
    }

    return (
        <>
            <UpdateLessonModal />
            <Toast
				show={show}
				style={{ 
                    position: 'fixed', 
                    top: '15%', 
                    right: '15px' 
                }}
				className={`bg-${type} text-white`}
				onClose={setShowDataToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={2000}
				autohide
			>
				<Toast.Body>
					<div className="font-semibold">{message}</div>
				</Toast.Body>
			</Toast>
            <div className="py-10 text-4xl font-semibold text-center">
                Quản lý Bài giảng
            </div>
            <Link to='/teacher/lessonsmanager/add'>
                <div className="shadow-lg text-center mb-4 mx-auto p-3 w-fit ">
                    Thêm bài giảng
                </div>
            </Link>

            <table className="table-fixed w-full border-2 border-collapse text-center">
                <thead className="bg-orange-300">
                    <tr>
                        <th className="w-[15%]">Tag</th>
                        <th className="w-[35%]">Tiêu đề</th>
                        <th className="py-2">Nội dung</th>
                        <th className="w-[10%]"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lessons.map(q => (
                            <tr className="border-2">
                                <td className="border">
                                    {q.tag}
                                </td>

                                <td className="border">
                                    {q.title}
                                </td>

                                <td className="border text-left">
                                    {q.content}
                                </td>

                                <td className="border">
                                    <LessonButton _id={q._id} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default LessonsManager
