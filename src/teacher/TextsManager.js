import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { DataContext } from "../contexts/dataContext"
import Toast from 'react-bootstrap/Toast'
import TextButton from "../components/items/TextButton"
import UpdateTextModal from "../components/form/UpdateTextModal"

const TextsManager = (props) => {
    const {
        textState: {
            textLoading,
            texts
        },
        getTexts,
        addText,
        showDataToast: {
            show,
            message,
            type
        },
        setShowDataToast
    } = useContext(DataContext)

    useEffect(() => {
        getTexts()
    },[])

    const [newData, setNewData] = useState({
        text:'',
        source:'',
        task:'',
        number:null,
        difficulty:0
    })

    if(textLoading) {
        return <LoadingSpinner />
    }

    const {text,source,task,difficulty,number} = newData

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await addText(newData)
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
            text:'',
            source:'',
            task:'',
            difficulty:0
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
                    Thêm đoạn văn
                </div>

                <Link to='/teacher/textsmanager'>
                    <div className="shadow-lg text-center mb-4 mx-auto p-3 w-fit ">
                        Trở lại trang quản lý
                    </div>
                </Link>

                <div className='font-medium text-lg'>
                    Đoạn văn
                </div>
                <textarea className="font-light border-2 w-full p-2 rounded-md" name='text' value={text} onChange={onChangeDataForm} rows='20' />
                
                <div className='font-medium text-lg'>
                    Nguồn
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='text' name='source' value={source} onChange={onChangeDataForm} />

                <div className='font-medium text-lg'>
                    Dạng bài
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" name='task' value={task} onChange={onChangeDataForm} />

                <div className='font-medium text-lg'>
                    Mức độ khó
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" name='difficulty' value={difficulty} min='0' max='900' onChange={onChangeDataForm} />

                <div className='font-medium text-lg'>
                    Số câu hỏi
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" name='number' value={number} onChange={onChangeDataForm} />
                
                <button className='my-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400' type='submit' onClick={onSubmit}>
					Thêm
				</button>
            </>
        )
    }

    return (
        <>
            <UpdateTextModal />
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
                Quản lý Đoạn văn
            </div>
            <Link to='/teacher/textsmanager/add'>
                <div className="shadow-lg text-center mb-4 mx-auto p-3 w-fit ">
                    Thêm đoạn văn
                </div>
            </Link>

            <table className="table-fixed w-full border-2 border-collapse text-center">
                <thead className="bg-orange-300">
                    <tr>
                        <th className="px-2">Đoạn văn</th>
                        <th className="w-[15%]">Dạng bài</th>
                        <th className="w-[15%]">Mức độ khó</th>
                        <th className="w-[10%]"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        texts.map(q => (
                            <tr className="border-2">
                                <td className="border text-left">
                                    {q.text.slice(0,500)} ...
                                </td>

                                <td className="border">
                                    {q.task}
                                </td>

                                <td className="border">
                                    {q.difficulty}
                                </td>

                                <td className="border">
                                    <TextButton _id={q._id} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default TextsManager
