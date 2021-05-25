import { memo } from 'react'
import { useSelector } from 'react-redux'

import Preloader from '../../../../../../components/Preloader'

const ListPreloader = ({ listId }) => {
   const isCardsFetching = useSelector((state) => state.lists.isCardsFetching)

   return isCardsFetching && isCardsFetching === listId ? (
      <div className="List__preloader">
         <Preloader />
      </div>
   ) : null
}

export default memo(ListPreloader)
