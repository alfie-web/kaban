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
