const AppointmentItem = props => {
  const {appointmentItem} = props
  const {date, title} = appointmentItem
  return (
    <li>
      <p>{title}</p>
      <p>Date:{date}</p>
    </li>
  )
}

export default AppointmentItem
