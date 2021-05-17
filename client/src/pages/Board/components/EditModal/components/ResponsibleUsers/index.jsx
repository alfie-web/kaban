import clsx from 'clsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import Avatar from '../../../../../../components/Avatar'
import DropDown from '../../../../../../components/DropDown'

const Users = ({ selectedUsers, setSelectedUsers }) => {
   const boardUsers = useSelector((state) => state.boards.currentBoard.users)

   const onSelect = (user) => {
      if (selectedUsers.find((su) => su._id === user._id)) {
         setSelectedUsers((prev) => [...prev.filter((m) => m._id !== user._id)])
      } else {
         setSelectedUsers((prev) => [...prev, user])
      }
   }

   return (
      <div className="EditModal__users-list">
         {boardUsers.length
            ? boardUsers.map((u) => (
                 <div
                    onClick={() => onSelect(u)}
                    className={clsx(
                       'EditModal__users-item',
                       selectedUsers.find((su) => su._id === u._id) &&
                          'selected'
                    )}
                    key={u._id}
                 >
                    <Avatar url={u.avatar} userName={u.fullname} />
                    {u.fullname}
                 </div>
              ))
            : null}
      </div>
   )
}

const ResponsibleUsers = ({ responsibleUsers = [], onChange = () => {} }) => {
   const [selected, setSelected] = useState(responsibleUsers)
   const [usersVisible, setUsersVisible] = useState(false)

   const onClose = () => {
      if (JSON.stringify(selected) !== JSON.stringify(responsibleUsers)) {
         onChange({
            prop: 'responsibleUsers',
            value: selected,
         })
      }
      setUsersVisible(false)
   }

   return (
      <div className="EditModal__users Scroll">
         <div
            className="EditModal__info"
            onClick={() => setUsersVisible(!usersVisible)}
         >
            <h3 className="EditModal__title">Ответственные</h3>

            <div className="EditModal__selectedUsers">
               {selected.map((user) => (
                  <Avatar
                     key={user._id}
                     url={user.avatar}
                     userName={user.fullname}
                     min
                  />
               ))}

               <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fillRule="evenodd" clipRule="evenodd" d="M9.5 0C10.0523 0 10.5 0.447715 10.5 1V8.5H18C18.5523 8.5 19 8.94771 19 9.5C19 10.0523 18.5523 10.5 18 10.5H10.5V18C10.5 18.5523 10.0523 19 9.5 19C8.94771 19 8.5 18.5523 8.5 18V10.5H1C0.447715 10.5 0 10.0523 0 9.5C0 8.94771 0.447715 8.5 1 8.5H8.5V1C8.5 0.447715 8.94771 0 9.5 0Z" fill="#8DA4B9"/>
               </svg>
            </div>
         </div>

         <DropDown
            isVisible={usersVisible}
            onClose={onClose}
            className="EditModal__dropdown"
         >
            <Users selectedUsers={selected} setSelectedUsers={setSelected} />
         </DropDown>
      </div>
   )
}

export default ResponsibleUsers
