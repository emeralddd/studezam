import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useContext,useEffect,useState } from 'react'
import { DataContext } from '../../contexts/dataContext'

const UpdateContestModal = () => {
    const {
        contestState:{nowContest},
        updateContest,
        setShowDataUpdateModal,
        setShowDataToast,
        showDataUpdateModal
    } = useContext(DataContext)

    const [newData, setNewData] = useState(nowContest)

    useEffect(() => {
        setNewData(nowContest)
    }, [nowContest])

    const {_id,tag,title,time,difficulty,task} = newData

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

    const onSubmit = async event => {
		event.preventDefault()

        console.log(event)

		const {success, message} = await updateContest(newData)
        setShowDataToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
		setNewData(nowContest)
		setShowDataUpdateModal(false)
	}

    return (
        <Modal  
            size="xl" 
            show={showDataUpdateModal} 
            onHide={resetNewData} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Sửa kỳ thi
                </Modal.Title>
			</Modal.Header>

            <Form>
                <Modal.Body>       
                    <div>
                        ID: {_id}
                    </div>     
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

                                <button className="mt-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={addQuestion.bind(this,i)} type='button'>
                                    Add Question
                                </button>
                            </div>
                        ))
                    }

                    <button className="my-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={addTask} type='button'>
                        Add Task
                    </button>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='text-black border-2 border-orange-400 hover:bg-white bg-orange-400' onClick={resetNewData}>
						Hủy bỏ
					</Button>
					<Button className='text-black border-2 border-orange-400 hover:bg-white bg-orange-400' onClick={onSubmit}>
						Cập nhật
					</Button>
                </Modal.Footer>   
            </Form>
        </Modal>
    )
}

export default UpdateContestModal