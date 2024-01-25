import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Home extends Component {
  state = {
    userInput: '',
    dateInput: '',
    appoinmentList: [],
    isFilerActive: false,
  }

  getAppointmentLists = () => {
    const {appoinmentList, isFilerActive} = this.state
    if (isFilerActive) {
      return appoinmentList.filter(each => each.isFilerActive === true)
    }
    return appoinmentList
  }

  onTitle = event => {
    this.setState({userInput: event.target.value})
  }

  onAddElements = event => {
    event.preventDefault()
    const {userInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: userInput,
      date: formattedDate,
      isStarted: false,
    }
    this.setState(prevState => ({
      appoinmentList: [...prevState.appoinmentList, newAppointment],
    }))
  }

  render() {
    const {userInput, dateInput, appoinmentList} = this.state
    const filterAppointmentList = this.getAppointmentLists()
    console.log(userInput)
    console.log(dateInput)

    return (
      <div>
        <form onSubmit={this.onAddElements}>
          <h1>Add Appointment</h1>
          <label htmlFor="title">TITLE</label>
          <input id="title" placeholder="Title" onChange={this.onTitle} />
          <br />
          <label htmlFor="date">DATE</label>
          <input id="date" placeholder="dd/mm/yy" />
          <br />
          <button type="submit" className="add-button">
            Add
          </button>

          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
            alt="appointments"
          />

          <hr />

          <h1>Appointments</h1>
          <button type="button" className="start-btn">
            Starred
          </button>
        </form>
        <ul>
          {filterAppointmentList.map(each => (
            <AppointmentItem key={each.id} appointmentItem={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
