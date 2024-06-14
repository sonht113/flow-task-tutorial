import { useState } from 'react'
import './App.css'
import Hello from './childcomponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Hello />
    </>
  )
}

export default App
