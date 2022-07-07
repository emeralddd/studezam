import {useContext} from 'react'
import editIcon from '../../assets/pencil-square.svg'
import trashIcon from '../../assets/trash.svg'
import { DataContext } from '../../contexts/dataContext'
const QuestionButtons = ({_id}) => {

    const {
        findQuestion,
        deleteQuestion,
        setShowDataUpdateModal
    } = useContext(DataContext)

    const update = async (_id) => {
        await findQuestion(_id)
        setShowDataUpdateModal(true)
    }

    const deleteQ = async (_id) => {
        if(!window.confirm('Xác nhận xóa?')) return
        await deleteQuestion(_id)
    }

    return (
        <div className='text-center'>
            <button className='p-2 m-1' onClick={update.bind(this, _id)}>
                <img src={editIcon} alt='edit' />
			</button>

            <button className='p-2 m-1' onClick={deleteQ.bind(this, _id)}>
                <img src={trashIcon} alt='edit' />
			</button>
        </div>
    )
}

export default QuestionButtons
