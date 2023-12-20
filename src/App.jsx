import React from 'react'
import "./App.css"
import Todo from './Todo'
import { usefireBase } from './Context/FirebaseProvider'
const App = () => {
  return (
    <>
      <Todo />
    </>
  )
}

export default App