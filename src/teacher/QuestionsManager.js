import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UpdateQuestionModal from "../components/form/UpdateQuestionModal"
import LoadingSpinner from "../components/items/LoadingSpinner"
import QuestionButtons from "../components/items/QuestionButtons"
import { DataContext } from "../contexts/dataContext"
import Toast from 'react-bootstrap/Toast'
import AlertMessage from "../components/layout/AlertMessage"

const QuestionsManager = (props) => {
    const {
        questionState: {
            questionLoading,
            questions
        },
        getQuestions,
        addQuestion,
        showDataToast: {
            show,
            message,
            type
        },
        setShowDataToast
    } = useContext(DataContext)

    useEffect(() => {
        getQuestions()
    },[])

    const [newData, setNewData] = useState({
        question:'',
        choices:['','','',''],
        answer:1,
        explanation:'',
        source:'',
        task:'',
        thematic:'',
        text:'',
        difficulty:0
    })

    if(questionLoading) {
        return <LoadingSpinner />
    }

    const {question,choices,answer,explanation,source,text,task,thematic,difficulty} = newData

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await addQuestion(newData)
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
            question:'',
            choices:['','','',''],
            answer:1,
            explanation:'',
            source,
            task:'',
            thematic:'',
            difficulty:0
        })
	}

    const onChangeChoicesForm = event => {
        const tmp = [...choices]
        tmp[Number(event.target.name)]=event.target.value
        setNewData({
            ...newData,
            choices:tmp 
        })
    }

    const char = ['A', 'B', 'C', 'D']

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
                    Thêm câu hỏi
                </div>

                <Link to='/teacher/questionsmanager'>
                    <div className="shadow-lg text-center mb-4 mx-auto p-3 w-fit ">
                        Trở lại trang quản lý
                    </div>
                </Link>

                <div className='font-medium text-lg'>
                    Câu hỏi
                </div>
                <textarea className="font-light border-2 w-full p-2 rounded-md" type='text' name='question' value={question} onChange={onChangeDataForm} />
                <div className='font-medium text-lg'>
                    Phương án
                </div>
                {
                    choices.map((t,index) => (
                        <div>
                            {char[index]}. <input className="font-light border-2 w-full p-2 rounded-md" type='text' name={index} value={choices[index]} onChange={onChangeChoicesForm} />
                        </div>
                    ))
                }
                <div className='font-medium text-lg'>
                    Đáp án đúng
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='number' min='1' max='4' name='answer' value={answer} onChange={onChangeDataForm} />
                <div className='font-medium text-lg'>
                    Giải thích
                </div>
                <textarea className="font-light border-2 w-full p-2 rounded-md" name='explanation' value={explanation} onChange={onChangeDataForm} />
                <div className='font-medium text-lg'>
                    Nguồn
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='text' name='source' value={source} onChange={onChangeDataForm} />
                <div className='font-medium text-lg'>
                    Dạng bài
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='text' name='task' value={task} onChange={onChangeDataForm} />
                <div className='font-medium text-lg'>
                    Chuyên đề
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='text' name='thematic' value={thematic} onChange={onChangeDataForm} />
                <div className='font-medium text-lg'>
                    Đoạn văn (với dạng đọc hiểu)
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='text' name='text' value={text} onChange={onChangeDataForm} />
                <div className='font-medium text-lg'>
                    Mức độ khó
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='number' min='1000' max='4999' name='difficulty' value={difficulty} onChange={onChangeDataForm} />

                <button className='my-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400' type='submit' onClick={onSubmit}>
					Thêm
				</button>
            </>
        )
    }

    return (
        <>
            <UpdateQuestionModal />
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
                Quản lý Câu hỏi
            </div>
            <Link to='/teacher/questionsmanager/add'>
                <div className="shadow-lg text-center mb-4 mx-auto p-3 w-fit ">
                    Thêm câu hỏi
                </div>
            </Link>

            <table className="table-fixed w-full border-2 border-collapse text-center">
                <thead className="bg-orange-300">
                    <tr>
                        <th className="py-2">Câu hỏi</th>
                        <th className="w-[15%]">Chuyên đề</th>
                        <th className="w-[10%]">Đăng bởi</th>
                        <th className="w-[10%]">Độ khó</th>
                        <th className="w-[10%]">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map(q => (
                            <tr className="border-2">
                                <td className="text-left border p-1">
                                    { q.question === ' ' || q.question[0]==='#' ?
                                        <div dangerouslySetInnerHTML={{__html:q.choices.join(' ')}} />
                                    :
                                        <div dangerouslySetInnerHTML={{__html:q.question }}  />
                                    }
                                </td>

                                <td className="border">
                                    {q.thematic}
                                </td>

                                <td className="border">
                                    {q.user}
                                </td>

                                <td className="border">
                                    {q.difficulty}
                                </td>

                                <td className="border">
                                    <QuestionButtons _id={q._id} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default QuestionsManager
