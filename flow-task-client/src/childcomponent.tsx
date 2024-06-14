import { useState } from "react"

const fanbonaci = (num: number): number => {
    console.log('11111')
    if(num <= 2) {
        return num
    }
    return fanbonaci(num - 1) + fanbonaci(num - 2)
}

const Hello = () => {
    const [count, setCount] = useState(0)
    console.log('hello')
    const num = fanbonaci(10)

  return (
    <div>childcomponent: {num}
    
    <button onClick={() => setCount((count) => count + 1)}>count is {count}</button></div>
  )
}

export default Hello;