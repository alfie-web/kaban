import { useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import { deleteList } from '../../../../../../store/reducers/lists'
import DropDown from '../../../../../../components/DropDown'

const OptionsDropdown = ({ listId }) => {
   const dispatch = useDispatch()
   const [isVisible, setIsVisible] = useState(false)

   const onDeleteList = () => {
      dispatch(deleteList(listId))
   }

   const onShow = () => setIsVisible(true)
   const onClose = () => setIsVisible(false)

   return (
      <div className="List__dropdown">
         <div
            onClick={onShow}
            className={clsx(
               'List__dropdown-btn',
               isVisible && 'List__dropdown-btn--active'
            )}
         >
            <svg
               width="16"
               height="4"
               viewBox="0 0 16 4"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path d="M0.230469 1.61328C0.230469 1.16406 0.380208 0.799479 0.679688 0.519531C0.985677 0.239583 1.36654 0.0996094 1.82227 0.0996094C2.28451 0.0996094 2.66536 0.239583 2.96484 0.519531C3.27083 0.799479 3.42383 1.16406 3.42383 1.61328C3.42383 2.05599 3.27409 2.41732 2.97461 2.69727C2.67513 2.9707 2.29102 3.10742 1.82227 3.10742C1.36003 3.10742 0.979167 2.9707 0.679688 2.69727C0.380208 2.41732 0.230469 2.05599 0.230469 1.61328Z" />
               <path d="M6.05078 1.61328C6.05078 1.16406 6.20052 0.799479 6.5 0.519531C6.80599 0.239583 7.18685 0.0996094 7.64258 0.0996094C8.10482 0.0996094 8.48568 0.239583 8.78516 0.519531C9.09115 0.799479 9.24414 1.16406 9.24414 1.61328C9.24414 2.05599 9.0944 2.41732 8.79492 2.69727C8.49544 2.9707 8.11133 3.10742 7.64258 3.10742C7.18034 3.10742 6.79948 2.9707 6.5 2.69727C6.20052 2.41732 6.05078 2.05599 6.05078 1.61328Z" />
               <path d="M11.8711 1.61328C11.8711 1.16406 12.0208 0.799479 12.3203 0.519531C12.6263 0.239583 13.0072 0.0996094 13.4629 0.0996094C13.9251 0.0996094 14.306 0.239583 14.6055 0.519531C14.9115 0.799479 15.0645 1.16406 15.0645 1.61328C15.0645 2.05599 14.9147 2.41732 14.6152 2.69727C14.3158 2.9707 13.9316 3.10742 13.4629 3.10742C13.0007 3.10742 12.6198 2.9707 12.3203 2.69727C12.0208 2.41732 11.8711 2.05599 11.8711 1.61328Z" />
            </svg>
         </div>

         <DropDown isVisible={isVisible} onClose={onClose} position="top">
            <div className="List__dropdown-item Link" onClick={onDeleteList}>
               Удалить лист
            </div>
         </DropDown>
      </div>
   )
}

export default memo(OptionsDropdown)
