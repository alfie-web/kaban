import Card from '../Card'

const ListCards = ({ listId, cardItems }) => {
   return cardItems && cardItems.length
      ? cardItems.map((card, index) => {
           return (
              <Card
                  key={card._id}
                  index={index}
                  card={card}
                  listId={listId}
                  className="Board__list-card"
              />
           )
        })
      : null
}

export default ListCards