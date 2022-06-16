import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react'
import { DataContext } from '../../contexts/dataContext'
import { Editor } from 'react-draft-wysiwyg'
import {convertFromRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const UpdateLessonModal = () => {
    const {
        lessonState:{nowLesson},
        updateLesson,
        setShowDataUpdateModal,
        setShowDataToast,
        showDataUpdateModal
    } = useContext(DataContext)

    const [newData, setNewData] = useState(nowLesson)

    // const [content,setContent] = useState('')

    useEffect(() => {
        setNewData(nowLesson)
    }, [nowLesson])

    const {_id,tag,title,content} = newData

    const onChangeDataForm = event => {
        setNewData({ ...newData, [event.target.name]: event.target.value})
    }

    const onChangeContent = event => {
        console.log(convertFromRaw(event))
        console.log(draftToHtml(convertFromRaw(event)))
    }

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateLesson(newData)
        setShowDataToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
		setNewData(nowLesson)
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
                    Sửa câu hỏi
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
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
                        Nội dung
                    </div>

                    <textarea 
                        className="p-2 font-light border-2 w-full rounded-md"
                        name='content' value={content} onChange={onChangeDataForm} rows='15'
                    />
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

export default UpdateLessonModal

