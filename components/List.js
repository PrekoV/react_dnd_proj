import React from 'react'
import Item from './Item'

const List = (props) => {
	const { nrOfColumns, items, listId } = props
	const width = `${100 / nrOfColumns}%`
	const handleOverEmptyList = (e) => props.handleOverEmptyList(listId, e)

	return <div className="listWrapper"
		width={width}
		onDragOver={handleOverEmptyList}
		onDragEnd={props.handleDragEnd}
		onDrop={props.handleDragEnd}
	>
		{items.map(item => <Item key={item.id} {...item} {...props} />)}
	</div>
}

export default List
