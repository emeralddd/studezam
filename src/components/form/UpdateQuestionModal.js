import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react'
import { DataContext } from '../../contexts/dataContext'
import Select from 'react-select'
import { taskss, thematicss } from '../../utils/SelectData'

const UpdateQuestionModal = ({textss}) => {
    const {
        questionState:{nowQuestion},
        updateQuestion,
        setShowDataUpdateModal,
        setShowDataToast,
        showDataUpdateModal
    } = useContext(DataContext)

    const [taskk, setTaskk] = useState({})

    const [thematicc, setThematicc] = useState({})

    const [textt, setTextt] = useState({})

    const [newData, setNewData] = useState(nowQuestion)

    useEffect(() => {
        setNewData(nowQuestion)
        setTaskk({label: nowQuestion.task, value: nowQuestion.task})
        setThematicc({label: nowQuestion.thematic, value: nowQuestion.thematic})
        if(nowQuestion.text) {
          setTextt(textss.find(t => t.value===nowQuestion.text))
        } else {
          setTextt({})
        }
    }, [nowQuestion])

    const {_id,question,choices,answer,explanation,source,difficulty} = newData

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const onChangeChoicesForm = event => {
        const tmp = [...choices]
        tmp[Number(event.target.name)]=event.target.value
        setNewData({
            ...newData,
            choices:tmp 
        })
    }

    const onChangeTaskForm = opt => {
        setTaskk(opt)
        setNewData({...newData,task:opt.value})
    }

    const onChangeThematicForm = opt => {
        setThematicc(opt)
        setNewData({...newData,thematic:opt.value})
    }

    const onChangeTextForm = opt => {
        setTextt(opt)
        setNewData({...newData,text:opt.value})
    }

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateQuestion(newData)
        setShowDataToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
		setNewData(nowQuestion)
		setShowDataUpdateModal(false)
	}

    const char = ['A', 'B', 'C', 'D']

    return (
        <Modal  
            size="lg" 
            show={showDataUpdateModal} 
            onHide={resetNewData} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Sửa câu hỏi
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>       
                    <div>
                        ID: {_id}
                    </div>     
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
                    <Select
                        placeholder='Chọn dạng bài'
                        options={taskss}
                        onChange={onChangeTaskForm}
                        value={taskk}
                    />
                    <div className='font-medium text-lg'>
                        Chuyên đề
                    </div>
                    <Select
                        placeholder='Chọn chuyên đề'
                        options={thematicss}
                        onChange={onChangeThematicForm}
                        value={thematicc}
                    />
                    <div className='font-medium text-lg'>
                        Đoạn văn (với dạng đọc hiểu)
                    </div>
                    <Select
                      placeholder='Chọn chuyên đề'
                      options={textss}
                      onChange={onChangeTextForm}
                      value={textt}
                    />
                    <div className='font-medium text-lg'>
                        Mức độ khó
                    </div>
                    <input className="font-light border-2 w-full p-2 rounded-md" type='number' min='1000' max='4999' name='difficulty' value={difficulty} onChange={onChangeDataForm} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='text-black border-2 border-orange-400 hover:bg-white bg-orange-400' onClick={resetNewData}>
						Hủy bỏ
					</Button>
					<Button className='text-black border-2 border-orange-400 hover:bg-white bg-orange-400' type='submit'>
						Cập nhật
					</Button>
                </Modal.Footer>   
            </Form>
        </Modal>
    )
}

export default UpdateQuestionModal

