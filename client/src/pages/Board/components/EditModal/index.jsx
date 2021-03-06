import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEditedCard, deleteCard } from '../../../../store/reducers/lists'

import { editCard } from '../../../../store/reducers/lists'
import Modal from '../../../../components/Modal'
import Button from '../../../../components/Button'
import TitleInput from './components/TitleInput'
import DescriptionInput from './components/DescriptionInput'
import DatePicker from './components/DatePicker'
import TimePicker from './components/TimePicker'
import Marks from './components/Marks'
import ResponsibleUsers from './components/ResponsibleUsers'
import Todos from './components/Todos'

import './EditModal.sass'

const EditModal = () => {
   const dispatch = useDispatch()
   const { editedCard } = useSelector((state) => state.lists)

   const closeModal = () => {
      dispatch(setEditedCard(null))
   }

   const changeCard = ({ prop, value }) => {
      editedCard[prop] !== value &&
         dispatch(
            editCard({
               listId: editedCard.listId,
               cardId: editedCard._id,
               prop,
               value,
            })
         )
   }

   const removeCard = () => {
      dispatch(
         deleteCard({ listId: editedCard.listId, cardId: editedCard._id })
      )
   }

   return editedCard ? (
      <div className="BoardPage__modal">
         <Modal isVisible={editedCard} onClose={closeModal}>
            <TitleInput title={editedCard.title} onBlur={changeCard} />

            <div className="EditModal__row">
               <DatePicker date={editedCard.date} onChange={changeCard} />

               <TimePicker time={editedCard.time} onChange={changeCard} />
            </div>

            <div className="EditModal__row">
               <Marks marks={editedCard.marks} onChange={changeCard} />

               <ResponsibleUsers
                  responsibleUsers={editedCard.responsibleUsers}
                  onChange={changeCard}
               />
            </div>

            <div className="EditModal__row">
               <DescriptionInput
                  description={editedCard.description}
                  onBlur={changeCard}
               />
            </div>

            <div className="EditModal__row">
               <Todos
                  todos={editedCard.todos}
                  onChange={changeCard}
               />
            </div>

            <div className="EditModal__row EditModal__delete">
               <Button
                  icon={
                     <svg
                        width="17"
                        height="20"
                        viewBox="0 0 17 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M2.74836 3.95046C2.721 3.53715 2.36376 3.22428 1.95046 3.25164C1.53715 3.279 1.22428 3.63624 1.25164 4.04954L2.74836 3.95046ZM2.90278 17.6364L3.65172 17.5956L3.65114 17.5868L2.90278 17.6364ZM14.0972 17.6364L13.3489 17.5868L13.3488 17.5879L14.0972 17.6364ZM15.7484 4.04954C15.7757 3.63624 15.4629 3.279 15.0495 3.25164C14.6362 3.22428 14.279 3.53715 14.2516 3.95046L15.7484 4.04954ZM1 3.25C0.585786 3.25 0.25 3.58579 0.25 4C0.25 4.41421 0.585786 4.75 1 4.75V3.25ZM16 4.75C16.4142 4.75 16.75 4.41421 16.75 4C16.75 3.58579 16.4142 3.25 16 3.25V4.75ZM5.38889 3.72728H4.63889C4.63889 4.14149 4.97468 4.47728 5.38889 4.47728V3.72728ZM5.38889 2.02273L6.13889 2.02273L6.13888 2.02023L5.38889 2.02273ZM6.55556 1L6.55363 1.75H6.55556V1ZM10.4444 1L10.4444 1.75001L10.4464 1.75L10.4444 1ZM11.6111 2.02273L10.8611 2.02023V2.02273H11.6111ZM11.6111 3.72728V4.47728C12.0253 4.47728 12.3611 4.14149 12.3611 3.72728H11.6111ZM9.25 6.45455C9.25 6.04034 8.91421 5.70455 8.5 5.70455C8.08579 5.70455 7.75 6.04034 7.75 6.45455H9.25ZM7.75 16C7.75 16.4142 8.08579 16.75 8.5 16.75C8.91421 16.75 9.25 16.4142 9.25 16H7.75ZM5.74938 6.42402C5.73252 6.01015 5.38334 5.68831 4.96947 5.70517C4.5556 5.72203 4.23376 6.07121 4.25062 6.48508L5.74938 6.42402ZM4.63951 16.0305C4.65637 16.4444 5.00555 16.7662 5.41942 16.7494C5.83329 16.7325 6.15513 16.3833 6.13827 15.9695L4.63951 16.0305ZM12.7494 6.48508C12.7662 6.07121 12.4444 5.72203 12.0305 5.70517C11.6167 5.68831 11.2675 6.01015 11.2506 6.42402L12.7494 6.48508ZM10.8617 15.9695C10.8449 16.3833 11.1667 16.7325 11.5806 16.7494C11.9945 16.7662 12.3436 16.4444 12.3605 16.0305L10.8617 15.9695ZM1.25164 4.04954L2.15442 17.6859L3.65114 17.5868L2.74836 3.95046L1.25164 4.04954ZM2.15389 17.6771C2.21849 18.8641 3.15568 19.75 4.34722 19.75V18.25C3.94988 18.25 3.67283 17.9845 3.65167 17.5956L2.15389 17.6771ZM4.34722 19.75H12.6528V18.25H4.34722V19.75ZM12.6528 19.75C13.8553 19.75 14.7697 18.8578 14.8457 17.6848L13.3488 17.5879C13.3227 17.9908 13.0455 18.25 12.6528 18.25V19.75ZM14.8456 17.6859L15.7484 4.04954L14.2516 3.95046L13.3489 17.5868L14.8456 17.6859ZM1 4.75H16V3.25H1V4.75ZM6.13889 3.72728V2.02273H4.63889V3.72728H6.13889ZM6.13888 2.02023C6.13882 1.99951 6.14324 1.97607 6.1554 1.95021L4.79816 1.31156C4.69338 1.53422 4.63806 1.77711 4.63889 2.02524L6.13888 2.02023ZM6.1554 1.95021C6.16777 1.92394 6.1892 1.89315 6.22399 1.86265L5.2352 0.734697C5.05314 0.894293 4.90274 1.0893 4.79816 1.31156L6.1554 1.95021ZM6.22399 1.86265C6.25897 1.83199 6.3057 1.8033 6.3636 1.78236L5.85352 0.371749C5.62792 0.453325 5.41707 0.575263 5.2352 0.734697L6.22399 1.86265ZM6.3636 1.78236C6.42153 1.76141 6.48636 1.74983 6.55363 1.75L6.55748 0.250007C6.31808 0.249392 6.07909 0.29018 5.85352 0.371749L6.3636 1.78236ZM6.55556 1.75H10.4444V0.250004H6.55556V1.75ZM10.4464 1.75C10.5136 1.74983 10.5785 1.76141 10.6364 1.78236L11.1465 0.371749C10.9209 0.29018 10.6819 0.249392 10.4425 0.250007L10.4464 1.75ZM10.6364 1.78236C10.6943 1.8033 10.741 1.832 10.776 1.86265L11.7648 0.734697C11.5829 0.575261 11.3721 0.453324 11.1465 0.371749L10.6364 1.78236ZM10.776 1.86265C10.8108 1.89315 10.8322 1.92394 10.8446 1.95021L12.2018 1.31156C12.0973 1.08931 11.9469 0.894294 11.7648 0.734697L10.776 1.86265ZM10.8446 1.95021C10.8568 1.97607 10.8612 1.99951 10.8611 2.02023L12.3611 2.02524C12.3619 1.77711 12.3066 1.53422 12.2018 1.31156L10.8446 1.95021ZM10.8611 2.02273V3.72728H12.3611V2.02273H10.8611ZM11.6111 2.97728H5.38889V4.47728H11.6111V2.97728ZM7.75 6.45455V16H9.25V6.45455H7.75ZM4.25062 6.48508L4.63951 16.0305L6.13827 15.9695L5.74938 6.42402L4.25062 6.48508ZM11.2506 6.42402L10.8617 15.9695L12.3605 16.0305L12.7494 6.48508L11.2506 6.42402Z" />
                     </svg>
                  }
                  onClick={removeCard}
                  title="?????????????? ????????????????"
               />
            </div>
         </Modal>
      </div>
   ) : null
}

export default memo(EditModal)
