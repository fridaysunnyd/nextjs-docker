import styles from "../../styles/Home.module.css";
import { useEffect, useState } from 'react';
import { useArr } from '../../use/useArr'

function TodoItem({ text, isEdit, updateItem }){
  const handleKeyPress = (event, v) => {
    if (event.key === 'Enter') {
      updateItem(v)
    }
  };

  return (
    <>
      {
        isEdit?
          <input defaultValue={text} type="text" placeholder="请输入" onKeyUp={(e) => handleKeyPress(e,e.target.value)}></input>:
          <span>{text}</span>
      }
    </>
  )
}

let lock = true

export default function TodoList() {
  const [data, setData] = useState('');
  const [list, setList, delList, updateList,unShiftArr,resetArr] = useArr();
  const [updateIndex, setIndex] = useState(null)


  useEffect(() => {
    _get().finally(()=>{
      lock = false
    })
  },[])

  useEffect(() => {
    if(!lock){
      _update()
    }
  }, [list])

  // create()
  async function _create(){
    await fetch(`/api/createTodoList`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('[]'),
    })
  }

  async function _update(){
    await fetch('/api/todoList/1', {
      method: 'PUT',
      body: JSON.stringify(list),
    })
  }

  async function _get(){
    const res = await fetch('/api/todoList')
    const data = await res.json()
    const list = JSON.parse(data.list)

    resetArr(list)
  }


  const handleAdd = (item) =>{
    unShiftArr({
      id: Date.now(),
      text: item,
      isDone: false
    })
    setData('')
  }

  const handleUpdata = (index) =>{
    setIndex(index)
  }

  const updateItem = (item) =>{
    updateList(updateIndex, {
      id: Date.now(),
      text: item,
      isDone: false
    })
    setIndex(null)
  }

  const handleCheckbox = (index) =>{
    updateList(index, {
      ...list[index],
      isDone: !list[index].isDone
    })
  }

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>

      <div className="row">
        <input type="text" className="mr-1" value={data} onChange={(e) => setData(e.target.value)}></input>
        <button onClick={()=>handleAdd(data)}>添加</button>
      </div>

      <div className={list.length > 0 ? 'row-left card' : ''}>
        {
          list.map((item, index) => {
            return (
              <div className="mb-1 row" key={item.id}>
                <input value={item.isDone} className="mr-1" type="checkbox" onChange={()=>handleCheckbox(index)} />

                <div className={`todo-item mr-1 bg-primary text-white ${item.isDone ? 'del' : ''}`} onDoubleClick={()=>handleUpdata(index)}>
                  <TodoItem 
                    text={item.text} 
                    isEdit={updateIndex === index} 
                    updateItem={(i)=>updateItem(i)}
                  ></TodoItem>
                </div>

                {
                  updateIndex !== index?
                    <>
                      <span className="small-btn bg-opacity0 text-red" onClick={() => delList(index)}>删除</span>
                    </>:null
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
