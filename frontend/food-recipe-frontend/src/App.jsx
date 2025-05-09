import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import Home from '../src/components/Home'
import AddFoodRecipe from './pages/AddFoodRecipe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      {/* <AddFoodRecipe/> */}
    </>
  )
}

export default App
