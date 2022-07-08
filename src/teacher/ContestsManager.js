import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { DataContext } from "../contexts/dataContext"
import Toast from 'react-bootstrap/Toast'
import ContestButton from "../components/items/ContestButton"
import UpdateContestModal from "../components/form/UpdateContestModal"
import { taskss } from "../utils/SelectData"
import Select, {createFilter} from "react-select"

const ContestsManager = (props) => {
    const {
        contestState: {
            contestLoading,
            contests
        },
        questionState: {
            questionLoading,
            questions
        },
        textState: {
            textLoading,
            texts
        },
        getContests,
        getQuestions,
        getTexts,
        addContest,
        showDataToast: {
            show,
            message,
            type
        },
        setShowDataToast
    } = useContext(DataContext)

    const [newData, setNewData] = useState({
        tag:'',
        title:'',
        content:'',
        task:[]
    })

    const [taskk, setTaskk] = useState([])

    const [textss,setTextss] = useState([])

    const [questionss,setQuestionss] = useState([])

    useEffect(() => {
        getContests()
        getQuestions()
        getTexts()
    },[])

    useEffect(() => {
        const arr = []
        if(texts.length>0) {
          for(const i of texts) {
            arr.push({label:i.text.substring(0,200),value:i._id})
          }
          setTextss(arr)
        }
    },[texts])

    useEffect(() => {
        const arr = []
        if(questions.length>0) {
          for(const i of questions) {
            arr.push({label:(i.question === ' ' || i.question[0]==='#' ? i.choices.join(' '):i.question),value:i._id})
          }
          setQuestionss(arr)
        }
    },[questions])

    if(contestLoading || questionLoading || textLoading) {
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

    const onChangeTask = (pos,event) => {
        const tmp = [...newData.task]
        const tmp1=[...taskk]
        
        tmp[pos].tag=event.value
        tmp1[pos].task=event 

        setNewData({ ...newData, task:tmp})
        setTaskk(tmp1)
    }

    const onChangeText = (pos,event) => {
        const tmp = [...newData.task]
        const tmp1=[...taskk]

        tmp[pos].text=event.value
        tmp1[pos].text=event

        setNewData({ ...newData, task:tmp})
        setTaskk(tmp1)
    }

    const onChangeQuestion = (pos,pos1,event) => {
        const tmp = [...newData.task]
        const tmp1 = [...taskk]

        tmp[pos].questions[pos1]=event.value
        tmp1[pos].questions[pos1]=event

        setNewData({ ...newData, task:tmp})
        setTaskk(tmp1)
    }

    const addTask = () => {
        const tmp = [...newData.task]
        const tmp1 = [...taskk]

        tmp.push({
            tag:'',
            text:'',
            questions:[]
        })

        tmp1.push({
            task:null,
            text:null,
            questions:[]
        })
        
        setNewData({ ...newData, task:tmp})
        setTaskk(tmp1)
    }

    const addQuestion = (tid) => {
        const tmp = [...newData.task]
        const tmp1 = [...taskk]

        tmp[tid].questions.push('')
        tmp1[tid].questions.push(null)
        
        setNewData({ ...newData, task:tmp})
        setTaskk(tmp1)
    }

    const deleteTask = (tid) => {
        const tmp = [...newData.task]
        const tmp1 = [...taskk]

        tmp.splice(tid,1)
        tmp1.splice(tid,1)
        
        setNewData({ ...newData, task:tmp})
        setTaskk(tmp1)
    }

    const deleteQuestion = (tid,qid) => {
        const tmp = [...newData.task]
        const tmp1 = [...taskk]

        tmp[tid].questions.splice(qid,1)
        tmp1[tid].questions.splice(qid,1)
        
        setNewData({ ...newData, task:tmp})
        setTaskk(tmp1)
    }

    const resetNewData = () => {
		setNewData({
            tag:'',
            title:'',
            content:'',
            task:[]
        })
        setTaskk([])
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
                            <Select
                                placeholder='Chọn dạng bài'
                                options={taskss}
                                onChange={onChangeTask.bind(this,i)}
                                value={taskk[i].task}
                            />
                            
                            <div className="font-medium">
                                Đoạn bản 
                            </div>
                            <Select
                                placeholder='Đối với dạng đọc hiểu'
                                options={textss}
                                filterOption={createFilter({ ignoreAccents: false })}
                                onChange={onChangeText.bind(this,i)}
                                value={taskk[i].text}
                            />
                            
                            <div className="font-medium">
                                Câu hỏi 
                            </div>

                            {
                                t.questions.map((q,j) => (
                                    <div className="flex items-center my-2">
                                        <Select
                                            placeholder='Chọn câu hỏi'
                                            options={questionss}
                                            onChange={onChangeQuestion.bind(this,i,j)}
                                            value={taskk[i].questions[j]}
                                            className='w-full'
                                        />

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
            <UpdateContestModal questionss={questionss} textss={textss} />
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
                        <th className="w-[20%]">Tag</th>
                        <th className="px-2">Tiêu đề</th>
                        <th className="w-[15%]">Thời gian</th>
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
