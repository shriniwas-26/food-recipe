import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button className='btn btn-primary'>Submit</button>
    </>
  )
}

export default App
