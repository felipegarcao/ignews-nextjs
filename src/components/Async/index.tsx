import { useEffect, useState } from "react"

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  useEffect(() =>{
    setTimeout(() => {
      setIsButtonVisible(true)
    }, 1000)
  }, [])
  
  return (
    
    <div>
      <div>Hello World</div>
      {isButtonVisible && <button>Button</button>}
    </div>

  )
}


export function AsyncNot(){
  const [isButtonInvisible, setIsButtonInvisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsButtonInvisible(true)
    })
  },[])

  return (
    <div>
      {!isButtonInvisible && <button>Button</button>}
    </div>
  )
}