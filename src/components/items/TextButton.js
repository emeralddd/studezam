import {useContext} from 'react'
import editIcon from '../../assets/pencil-square.svg'
import { DataContext } from '../../contexts/dataContext'
const TextButton = ({_id}) => {

    const {
        findText,
        setShowDataUpdateModal
    } = useContext(DataContext)

    const update = async (_id) => {
        await findText(_id)
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

export default TextButton
