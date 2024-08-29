import { useState } from 'react'

export const useArr = (data = []) => {
  
  const [arr, setArr] = useState(data)

  const addArr = (item) => {
    setArr([...arr, item])
  }

  const updateArr = (index, item) => {
    arr[index] = item
    setArr([...arr])
  }

  const delArr = (index) => {
    arr.splice(index, 1)
    setArr([...arr])
  }

  const pushArr = (item) => {
    setArr([...arr, item])
  }

  const unShiftArr = (item) => {
    setArr([item, ...arr])
  }
  
  return [    
    arr,
    addArr,
    delArr,
    updateArr,
    pushArr,
    unShiftArr
  ]
}
