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

  const unShiftArr = (item) => {
    setArr([item, ...arr])
  }

  const resetArr = (list) => {
    setArr(list)
  }
  
  return [    
    arr,
    addArr,
    delArr,
    updateArr,
    unShiftArr,
    resetArr
  ]
}
