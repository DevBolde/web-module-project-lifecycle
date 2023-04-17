import React from 'react'
import axios from 'axios'
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state ={
      todos: [],
      error: '',
      todoNameInput:''
    }
  onTodoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value})
  }
  //Refactoring Code//
  resetForm = () => this.setState({ ...this.state, todoNameInput: ''})

  setAxiosResponseError = err => {
    this.setState({...this.state, error: err.response.data.message})
  }


  //Methods//
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
    .then(res => {
      this.setState({ ...this.state, quotes: this.state.quotes.concat(res.data.data) })
      this.resetForm();
    })
    .catch(this.setAxiosResponseError)
  }
  
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosResponseError)
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo();
  }

  componentDidMount(){
    // fetch all todos from server
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return<div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input type="text" onChange={this.onTodoNameInputChange} placeholder="Type todo"></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
