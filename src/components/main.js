import React from 'react'
import './main.css'

const checkedStyle = {
  textDecoration: 'line-through'
}

export default class Main extends React.Component {
  input = React.createRef() // Bind input with component field
	state = {
    value: '',
    tasks: []
  }
  
  componentDidMount() {
    if (!localStorage.length) {
      return localStorage.setItem(`taskList`, JSON.stringify([]))
    }
    const tasks = JSON.parse(localStorage.getItem('taskList'))
    this.setState({ tasks })
  }

	addTask = async () => {
    await this.setState({tasks: this.state.tasks.concat({ value: this.input.current.value, check: false })})
    localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
    this.input.current.value = this.state.value
	}

  editTask = async (index) => {
    const edited = prompt('', this.state.tasks[index].value)
    const tasks = this.state.tasks
    tasks[index].value = edited
    
    await this.setState({ tasks })

    localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
  }

  deleteTask = async (index) => {
    const tasks = this.state.tasks
    tasks.splice(index.value, 1)

    await this.setState({ tasks })
    localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
  }

	setChecked = async (index) => {
    const tasks = this.state.tasks
    tasks[index].check = !tasks[index].check
    await this.setState({ tasks })
    localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
	}

  render(){
    return (
			<div className = 'wrapper'>
        <div>
          <div className='input'>
            <label htmlFor='task'> click</label>
            <input ref={this.input} id ='task' />

            <button onClick = {this.addTask} >Add</button>
          </div>

          <div>
          
            <details open={true}>
              <summary>
                TASKS
              </summary>
            <ol>
              {this.state.tasks.map((task, index) => (
                <li key={index} >
                  <span onClick={() => this.setChecked(index)} style={task.check ? checkedStyle : {}}>{task.value}</span>
                  <button onClick={() => this.editTask(index)}>edit</button>
                  <button onClick={() => this.deleteTask(index)}>delete</button>
                </li>)
              )}
            </ol>

            </details>

            
          </div>
        </div>
     </div>

    );
	}

}