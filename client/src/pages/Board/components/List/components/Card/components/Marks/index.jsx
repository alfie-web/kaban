import { memo } from 'react'

const CardMarks = ({ marks }) => {
   return marks && marks.length ? (
      <div className="Card__marks">
         {marks.map((m) => (
            <span
               className="Card__mark"
               key={m}
               style={{ backgroundColor: `#${m}` }}
            ></span>
         ))}
      </div>
   ) : null
}

export default memo(CardMarks)
