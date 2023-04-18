import React from 'react'
import axios from 'axios'
import Form from './Form'
import Todo from './Todo'
import TodoList from './TodoList'
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state ={
      todos: [],
      error: '',
      todoNameInput:'',
      displayCompleteds: true
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
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
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
  toggleCompleted = id => evt => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.map(td => {
        if(td.id !== id) return td
        return res.data.data
      })})
    })
    .catch(this.setAxiosResponseError)
  }
  toggleDisplayCompleteds = evt => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds})
  }
  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.reduce((acc, td) => {
            
              if(this.state.displayCompleteds || !td.completed) return acc.concat(
                <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? ' ✔️' : ''}</div>
              )
             return acc;
            },[])
          }
        </div>
        <Form 
        onTodoFormSubmit={this.onTodoFormSubmit} 
        onTodoNameInputChange={this.onTodoNameInputChange}
        toggleDisplayCompleteds={this.toggleDisplayCompleteds}
        todoNameInput={this.state.todoNameInput} 
        displayCompleteds={this.state.displayCompleteds}
        />
      </div>
    )
  }
}
