import clsx from 'clsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import Avatar from '../../../../../../components/Avatar'
import DropDown from '../../../../../../components/DropDown'
import Button from '../../../../../../components/Button'

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
            // onClick={() => setUsersVisible(!usersVisible)}
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

               <Button
                  onClick={() => setUsersVisible(!usersVisible)}
                  active={usersVisible}
                  icon={
                     <svg
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M9.25 0C9.66421 0 10 0.335786 10 0.75V8.5H17.75C18.1642 8.5 18.5 8.83579 18.5 9.25C18.5 9.66421 18.1642 10 17.75 10H10V17.75C10 18.1642 9.66421 18.5 9.25 18.5C8.83579 18.5 8.5 18.1642 8.5 17.75V10H0.75C0.335786 10 0 9.66421 0 9.25C0 8.83579 0.335786 8.5 0.75 8.5H8.5V0.75C8.5 0.335786 8.83579 0 9.25 0Z"
                        />
                     </svg>
                  }
               />
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
