import React from 'react'
import './main.css'

export default class Main extends React.Component {
  input = React.createRef() // Bind input with component field
	state = {
    check: true,
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
    await this.setState({tasks: this.state.tasks.concat(this.input.current.value)})
    localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
	}

  editTask = async (index) => {
    const edited = prompt('', this.state.tasks[index])
    const tasks = this.state.tasks
    tasks[index] = edited
    
    await this.setState({ tasks })

    localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
  }

  deleteTask = async (index) => {
    const tasks = this.state.tasks
    tasks.splice(index, 1)

    await this.setState({ tasks })
    localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
  }

	zacherk = (e) => {
		if(this.state.check) {
			this.setState({check: !this.state.check})
			e.target.style = `text-decoration: line-through;`
		} else if (!this.state.check) {
			this.setState({check: !this.state.check})
			e.target.style = `text-decoration: underline;`
		}
		
	}

  render(){
    return (
			<div className = 'wrapper'>
      <div>
				<label htmlFor='task'> click</label>
      	<input ref={this.input} id ='task' />

				<button onClick = {this.addTask} >Add</button>
			</div>

				<br/>
				<br/>
				<div>
					
					<details open={true} onClick = {this.parser}>
						<summary>
							TASKS
						</summary>
          <ol>
            {this.state.tasks.map((task, index) => (
              <li key={index}>
                <span onClick={this.zacherk}>{task}</span>
                <button onClick={() => this.editTask(index)}>edit</button>
                <button onClick={() => this.deleteTask(index)}>X</button>
              </li>)
            )}
          </ol>

					</details>

					
				</div>
     </div>

    );
	}

}