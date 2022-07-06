import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useContext,useEffect,useState } from 'react'
import { DataContext } from '../../contexts/dataContext'
import { taskss } from '../../utils/SelectData'
import Select, {createFilter} from "react-select"

const UpdateContestModal = ({questionss,textss}) => {
    const {
        contestState:{nowContest},
        updateContest,
        setShowDataUpdateModal,
        setShowDataToast,
        showDataUpdateModal
    } = useContext(DataContext)

    const [newData, setNewData] = useState(nowContest)

    const [old,setOld] = useState([])
    
    const [taskk, setTaskk] = useState([])
    // console.log(questionss)
    useEffect(() => {
        setNewData(nowContest)
        const tmp2=[]
        
        for(const t of nowContest.task) {
            const qu=[]
            for(const q of t.questions) {
                // console.log(q)
                qu.push(questionss.find(que => que.value===q))
            }
            tmp2.push({
                task:taskss.find(ta => ta.value === t.tag),
                text:(t.text?textss.find(te => te.value === t.text):null),
                questions:qu
            })
        }
        setTaskk(tmp2)
        setOld(tmp2)
    }, [nowContest])

    const {_id,tag,title,time,difficulty,task} = newData

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

    const onSubmit = async event => {
		event.preventDefault()

        // console.log(event)

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
        setTaskk(old)
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