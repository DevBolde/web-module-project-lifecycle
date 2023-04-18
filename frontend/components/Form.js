import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
            <input type="text" value={this.props.todoNameInput} onChange={this.props.onTodoNameInputChange} placeholder="Type todo"></input>
            <input type="submit"></input>
          
          </form>
          <button onClick={this.props.toggleDisplayCompleteds}>{this.props.displayCompleteds ? 'Hide' : 'Show'} Completed</button>
      </div>
    )
  }
}
