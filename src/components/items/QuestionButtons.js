import {useContext} from 'react'
import editIcon from '../../assets/pencil-square.svg'
import { DataContext } from '../../contexts/dataContext'
const QuestionButtons = ({_id}) => {

    const {
        findQuestion,
        setShowDataUpdateModal
    } = useContext(DataContext)

    const update = async (_id) => {
        await findQuestion(_id)
        setShowDataUpdateModal(true)
    }

    return (
        <div className='text-center'>
            <button className='p-2 m-1' onClick={update.bind(this, _id)}>
                <img src={editIcon} alt='edit' />
			</button>
        </div>
    )
}

export default QuestionButtons
