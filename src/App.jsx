import React from 'react'
import { getTopNotifications } from '../stage1/priorityNotification'
const App = () => {
  getTopNotifications()
  return (
    <div>App</div>
  )
}

export default App