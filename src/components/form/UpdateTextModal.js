import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react'
import { DataContext } from '../../contexts/dataContext'
import { Editor } from 'react-draft-wysiwyg'
import {convertFromRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const UpdateTextModal = () => {
    const {
        textState:{nowText},
        updateText,
        setShowDataUpdateModal,
        setShowDataToast,
        showDataUpdateModal
    } = useContext(DataContext)

    const [newData, setNewData] = useState(nowText)

    // const [content,setContent] = useState('')

    useEffect(() => {
        setNewData(nowText)
    }, [nowText])

    const {_id,text,source,task,number} = newData

    const onChangeDataForm = event => {
        setNewData({ ...newData, [event.target.name]: event.target.value})
    }

    // const onChangeContent = event => {
    //     console.log(convertFromRaw(event))
    //     console.log(draftToHtml(convertFromRaw(event)))
    // }

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateText(newData)
        setShowDataToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
		setNewData(nowText)
		setShowDataUpdateModal(false)
	}

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
                    Sửa đoạn văn
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>       
                    <div>
                        ID: {_id}
                    </div>     
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
                        Số câu hỏi
                    </div>
                    <input className="font-light border-2 w-full p-2 rounded-md" name='number' value={number} onChange={onChangeDataForm} />
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

export default UpdateTextModal

