import { memo } from 'react'
import Avatar from '../../../../../../../../components/Avatar'

const CardResponsibleUsers = ({ responsibleUsers }) => {
   return responsibleUsers && responsibleUsers.length
      ? responsibleUsers.map((user) => (
           <Avatar
              key={user._id}
              url={user?.avatar}
              userName={user.fullname}
              min
           />
        ))
      : null
}

export default memo(CardResponsibleUsers)
