import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react'
import { DataContext } from '../../contexts/dataContext'

const UpdateQuestionModal = () => {
    const {
        questionState:{nowQuestion},
        updateQuestion,
        setShowDataUpdateModal,
        setShowDataToast,
        showDataUpdateModal
    } = useContext(DataContext)

    const [newData, setNewData] = useState(nowQuestion)

    useEffect(() => {
        setNewData(nowQuestion)
    }, [nowQuestion])

    const {_id,question,choices,answer,explanation,source,task,thematic,difficulty} = newData

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const onChangeChoicesForm = event => {
        const tmp = [...choices]
        tmp[Number(event.target.name)]=event.target.value
        setNewData({
            ...newData,
            choices:tmp 
        })
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
                    <input className="font-light border-2 w-full p-2 rounded-md" type='text' name='task' value={task} onChange={onChangeDataForm} />
                    <div className='font-medium text-lg'>
                        Chuyên đề
                    </div>
                    <input className="font-light border-2 w-full p-2 rounded-md" type='text' name='thematic' value={thematic} onChange={onChangeDataForm} />
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

