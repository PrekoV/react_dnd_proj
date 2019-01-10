import React, { Component } from 'react'
import List from '../components/List'
import Item from '../components/Item'

class Kanban extends Component {
	static removeItem(array, element) {
		return array.filter(e => e !== element);
	}

	state = {
		...this.props.state,
		draggedElementId: null,
		draggedListId: null,
	}

	getItems(list) {
		return list.map(listElement => this.state.elements[listElement])
	}

	handleDragStart = (id, listId, e) => {
		this.setState({
			draggedElementId: id,
			draggedListId: listId,
		})

		if (e.dataTransfer !== undefined) {
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.dropEffect = 'move'
			e.dataTransfer.setData('text', id) // firefox fix
		}
	}

	handleDragEnd = (e) => {
		e.preventDefault()
		this.setState({
			draggedElementId: null,
			draggedListId: null,
		})
	}

	handleDragOver = (id, listId, e) => {
		e.preventDefault()
		if (this.state.draggedElementId === id) return

		const overElementHeight = e.currentTarget.getBoundingClientRect().height / 2
		const overElementTopOffset = e.currentTarget.getBoundingClientRect().top
		const mousePositionY = e.clientY

		const showAfter = mousePositionY - overElementTopOffset > overElementHeight

		const draggedListId = this.state.draggedListId
		const draggedElementId = this.state.draggedElementId
		const lists = Object.assign({}, this.state.lists)
		let index

		lists[draggedListId] = Kanban.removeItem(lists[draggedListId], draggedElementId)
		index = lists[listId].indexOf(id)
		if (showAfter) index += 1
		lists[listId].splice(index, 0, draggedElementId)

		this.setState({
			lists,
			draggedListId: listId,
		})
	}

	handleOverEmptyList = (listId, e) => {
		e.preventDefault()
		if (this.state.lists[listId].length > 0) return

		const lists = Object.assign({}, this.state.lists)
		const draggedElementId = this.state.draggedElementId
		const draggedListId = this.state.draggedListId
		lists[draggedListId] = Kanban.removeItem(lists[draggedListId], draggedElementId)
		lists[listId].push(draggedElementId)

		this.setState({
			lists,
			draggedListId: listId,
		})
	}

	render() {
		const listsIds = Object.keys(this.state.lists)
		const listsValues = Object.values(this.state.lists)

		return <div className="wrapper">
			<div className="sidebar">
				<div className="square">
					<Item key={99999} title="New one" />
				</div>
			</div>
			<div className="mainContainer">
				{listsValues.map((list, i) => <List
					key={listsIds[i]}
					listId={listsIds[i]}
					items={this.getItems(list)}
					nrOfColumns={listsIds.length}
					handleDragStart={this.handleDragStart}
					handleDragOver={this.handleDragOver}
					handleDragEnd={this.handleDragEnd}
					handleOverEmptyList={this.handleOverEmptyList}
					draggedElementId={this.state.draggedElementId}
				/>)}
			</div>
		</div>
	}
}

export default Kanban
