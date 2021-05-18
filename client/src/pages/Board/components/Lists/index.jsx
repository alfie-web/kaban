import { memo } from 'react'
import { useSelector } from 'react-redux'

import List from '../List'

const BoardLists = () => {
   const items = useSelector(state => state.lists.items)

   return items && items.length
      ? items.map((list, index) => (
           <List
              key={list._id}
              index={index}
              className="BoardPage__list"
              list={list}
           />
        ))
      : null
}

export default memo(BoardLists)