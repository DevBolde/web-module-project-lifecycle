import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div 
        onClick={this.props.toggleCompleted(this.props.todo.id)} 
        key={this.props.todo.id}
      >
        {this.props.todo.name} {this.props.todo.completed ? ' ✔️' : ''}
      </div>
    )
  }
}
