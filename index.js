import React from 'react'
import ReactDOM from 'react-dom'
import Kanban from './containers/Kanban'
import RandomTasks from './utils/randomTasks'
import './style.css'

ReactDOM.render(<Kanban state={RandomTasks} />, document.getElementById('root'))