import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { DataContext } from "../contexts/dataContext"
import Toast from 'react-bootstrap/Toast'
import ContestButton from "../components/items/ContestButton"
import UpdateContestModal from "../components/form/UpdateContestModal"

const ContestsManager = (props) => {
    const {
        contestState: {
            contestLoading,
            contests
        },
        getContests,
        addContest,
        showDataToast: {
            show,
            message,
            type
        },
        getTasks,
        stringTasks,
        setShowDataToast
    } = useContext(DataContext)

    useEffect(() => {
        getContests()
    },[])

    const [newData, setNewData] = useState({
        tag:'',
        title:'',
        content:'',
        task:[]
    })

    if(contestLoading) {
        return <LoadingSpinner />
    }

    const {tag,title,time,difficulty,task} = newData

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await addContest(newData)
        setShowDataToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		if(success) resetNewData()
	}

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const onChangeTask = event => {
        const tmp = [...newData.task]
        tmp[Number(event.target.name)].tag=event.target.value
        setNewData({ ...newData, task:tmp})
    }

    const onChangeText = event => {
        const tmp = [...newData.task]
        tmp[Number(event.target.name)].text=event.target.value
        setNewData({ ...newData, task:tmp})
    }

    const onChangeQuestion = event => {
        const tmp = [...newData.task]
        tmp[Number(event.target.id)].questions[Number(event.target.name)]=event.target.value
        setNewData({ ...newData, task:tmp})
    }

    const addTask = () => {
        const tmp = [...newData.task]

        tmp.push({
            tag:'',
            text:'',
            questions:[]
        })
        
        setNewData({ ...newData, task:tmp})
    }

    const addQuestion = (tid) => {
        const tmp = [...newData.task]

        tmp[tid].questions.push('')
        
        setNewData({ ...newData, task:tmp})
    }

    const deleteTask = (tid) => {
        const tmp = [...newData.task]

        tmp.splice(tid,1)
        
        setNewData({ ...newData, task:tmp})
    }

    const deleteQuestion = (tid,qid) => {
        const tmp = [...newData.task]

        tmp[tid].questions.splice(qid,1)
        
        setNewData({ ...newData, task:tmp})
    }

    const resetNewData = () => {
		setNewData({
            tag:'',
            title:'',
            content:'',
            task:[]
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
                    Thêm Kỳ thi
                </div>

                <Link to='/teacher/contestsmanager'>
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
                    Thời gian
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='number' name='time' min='0' value={time} onChange={onChangeDataForm} />

                <div className='font-medium text-lg'>
                    Mức độ khó
                </div>
                <input className="font-light border-2 w-full p-2 rounded-md" type='number' name='difficulty' min='0' max='900' value={difficulty} onChange={onChangeDataForm} />

                <div className='font-medium text-lg'>
                    Bài tập
                </div>

                {
                    task.map((t,i) => (
                        <div className="border-2 p-2 rounded-md my-3">
                            <button className="mb-2 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={deleteTask.bind(this,i)}>
                                Delete
                            </button>

                            <div className="font-medium">
                                Tên bài  
                            </div>
                            <input className="font-light border-2 w-full p-2 rounded-md" type='text' name={i} value={t.tag} onChange={onChangeTask} />
                            
                            <div className="font-medium">
                                Đoạn bản 
                            </div>
                            <input className="font-light border-2 w-full p-2 rounded-md" type='text' name={i} value={t.text} onChange={onChangeText} />
                            
                            <div className="font-medium">
                                Câu hỏi 
                            </div>

                            {
                                t.questions.map((q,j) => (
                                    <div className="flex items-center my-2">
                                        <input className="font-light border-2 w-full p-2 rounded-md" type='text' name={j} id={i} value={q} onChange={onChangeQuestion} />

                                        <button className="ml-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={deleteQuestion.bind(this,i,j)}>
                                            Delete
                                        </button>
                                    </div>
                                    
                                ))
                            }

                            <button className="mt-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={addQuestion.bind(this,i)}>
                                Add Question
                            </button>
                        </div>
                    ))
                }

                <button className="my-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={addTask}>
                    Add Task
                </button>

                <hr />
                
                <button className='my-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400' type='submit' onClick={onSubmit}>
					Thêm
				</button>
            </>
        )
    }

    return (
        <>
            <UpdateContestModal />
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
                Quản lý Kỳ thi
            </div>
            <Link to='/teacher/contestsmanager/add'>
                <div className="shadow-lg text-center mb-4 mx-auto p-3 w-fit ">
                    Thêm kỳ thi
                </div>
            </Link>

            <table className="table-fixed w-full border-2 border-collapse text-center">
                <thead className="bg-orange-300">
                    <tr>
                        <th className="w-[15%]">Tag</th>
                        <th className="px-2">Tiêu đề</th>
                        <th className="w-[15%]">Thời gian</th>
                        <th className="w-[15%]">Độ khó</th>
                        <th className="w-[10%]"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contests.map(q => (
                            <tr className="border-2">
                                <td className="border">
                                    {q.tag}
                                </td>

                                <td className="border">
                                    {q.title}
                                </td>

                                <td className="border">
                                    {q.time}
                                </td>

                                <td className="border">
                                    {q.difficulty}
                                </td>

                                <td className="border">
                                    <ContestButton _id={q._id} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default ContestsManager
