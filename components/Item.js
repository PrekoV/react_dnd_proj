import React from 'react'

const Item = (props) => {
	const handleDragStart = (e) => props.handleDragStart(props.id, props.listId, e)
	const handleDragOver = (e) => props.handleDragOver(props.id, props.listId, e)

	return <div
		className="elemDrag"
		id={props.id}
		listId={props.listId}
		color={props.color}
		draggedElementId={props.draggedElementId}
		draggable="true"
		onDragStart={handleDragStart}
		onDragEnd={props.handleDragEnd}
		onDrop={props.handleDragEnd}
		onDragOver={handleDragOver}>
		{props.title}
	</div>
}

Item.defaultProps = {
	draggedElementId: '',
}

export default Item
