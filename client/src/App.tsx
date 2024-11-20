import Plus from './assets/Vector.png';
import Tick from './assets/Vector (1).png';
import Trash from './assets/Vector (2).png';
import Pen from './assets/editing.png';
import "@fontsource/inter/400.css";
import './index.css'
import "@fontsource/inter/700.css";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const App = () => {
  //states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Dones[]>([]);
  const [input, setInput] = useState<string>('');
  const [edit,setEdit] = useState<string>('');
  const [editIndex,setEditIndex] = useState<number>(0)
  const [current, setCurrent] = useState<'toDo' | 'done'>('toDo');
  const [currentEdit, setCurrentEdit] = useState<'toDo' | 'done' | null>(null);

  //ref
  const modalRef = useRef<any>()

  //getData
  useEffect(()=>{
    axios('http://localhost:3000/')
    .then(res => {
      console.log(res.data);
      setTodos(res.data.todoArr)
    }).catch(err => {
      console.log(err);
    })
    axios('http://localhost:3000/dones/')
    .then(res => {
      console.log(res.data);
      setDones(res.data.doneArr)
    }).catch(err => {
      console.log(err);
    })
  },[])

  //interfaces
  interface Todo {
    todo: string,
    id: number
  }
  interface Dones {
    done: string,
    id: number
  }

  //adds Todos
  const addTodo = async (e:any) => {
    e.preventDefault();
    const id = Date.now()
    detectScrollbar()
    try {
      const response = await axios.post("http://localhost:3000/",{
        title : input,
        id,
      })
      console.log(response.data); 
    } catch (error) {
      console.log(error);
    }
    todos.push({
      todo: input,
      id,
    });
    setTodos(todos);
    setInput('')
  }

  //adds Dones
  const addDoneTodos = async (obj: { todo: string, id: number }, index: number) => {
    console.log(obj.id);
    console.log(todos[index].id);
    try {
      const add = await axios.post("http://localhost:3000/dones/add",{
        title : obj.todo,
        id: obj.id
      })
      console.log(add.data);
      setDones([...dones, { done: obj.todo, id: obj.id }]);
      setTodos(todos.filter((_, i) => i !== index))
    } catch (error) {
      console.log(error);
    }
    setInput('')
  }

  //deletes Todos
  const deleteTodo = async (index: number, current: string) => {
    if (current === 'toDo') {
      try {
        const response = await axios.delete(`http://localhost:3000/${todos[index].id}`)
        console.log(response.data); 
      } catch (error) {
        console.log(error);
      }
      setTodos(todos.filter((_, i) => i !== index))
      return
    }
    if (current === 'done') {
      try {
        const response = await axios.delete(`http://localhost:3000/dones/delete/${dones[index].id}`)
        console.log(response.data); 
      } catch (error) {
        console.log(error);
      }
      const filteredDones = dones.filter((_, i) => i !== index)
      setDones(filteredDones)
    }
    detectScrollbar()
  }

  //opens modal
  const openModal = (index: number, current: string) => {
    document.documentElement.classList.add("modal-open");
    modalRef.current.showModal();
    if (current === 'toDo') {
      setEdit(todos[index].todo)
    }
    if (current === 'done') {
      setEdit(dones[index].done)
      setCurrentEdit('done')
    }
    setEditIndex(index)
    console.log(edit, '=> edit');
    console.log(editIndex, '=> edit index');
    detectScrollbar();
  }

  //edits Todos
  const editTodo = async () => {
    if (currentEdit === 'done') {
      dones[editIndex].done = edit;
      setDones([...dones])
      try {
        const response = await axios.put(`http://localhost:3000/dones/edit/${dones[editIndex].id}`,{
          updatedTitle : edit
        })
        console.log(response.data); 
      } catch (error) {
        console.log(error);
      }
      setCurrentEdit(null)
      return
    }
    try {
      const response = await axios.put(`http://localhost:3000/${todos[editIndex].id}`,{
        updatedTitle : edit
      })
      console.log(response.data); 
    } catch (error) {
      console.log(error);
    }
    todos[editIndex].todo = edit;
    setTodos([...todos])
    document.documentElement.classList.remove("modal-open");
    modalRef.current.close();
    setEditIndex(0)
    setCurrentEdit(null)
    detectScrollbar();
  }

  //checks Scrollbar
  function detectScrollbar() {
    const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
    console.log('Scrollbar detected:', hasScrollbar);
    document.documentElement.style.setProperty('--scrollbar-width', hasScrollbar ? '17px' : '0');
    if (hasScrollbar) {
      document.documentElement.classList.add('scrollbar-present');
    } else {
      document.documentElement.classList.remove('scrollbar-present');
    }
  }
  window.addEventListener('load', detectScrollbar);
  return (
    <>
      <div className="bg-[#0D0714] outer h-full min-h-[100vh] w-full flex justify-center items-start">
        <div className="text-center bg-[#1D1825] w-full my-20 max-w-[600px] mx-[12px] p-8">
          <form name='todo' onSubmit={addTodo} className="flex items-center">
            <input required type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Add To Do" className="input me-4 focus:outline-offset-2 focus:outline-[#9E78CF] focus-within:outline-offset-2 focus-within:outline-[#9E78CF] bg-[#1D1825] border-[#9E78CF] w-full" />
            <button type='submit' className='bg-[#9E78CF] cursor-pointer active:bg-[#7d49c0] hover:bg-[#9064c9] p-[10px] rounded-md'>
              <img src={Plus} alt="Add To Do" />
            </button>
          </form>
          <div className='w-full flex justify-between items-center mt-10'>
            <h1 style={current === "done" ? { color: "inherit" } : { color: "white" }} onClick={() => setCurrent('toDo')} className='text-[16px] cursor-pointer font-inter text-white'>{todos.length > 0 ? `Tasks to do - ${todos.length}` : 'No tasks added'}</h1>
            <h1 style={current === "toDo" ? { color: "inherit" } : { color: "white" }} onClick={() => setCurrent('done')} className='text-[16px] cursor-pointer font-inter text-white'>{dones.length > 0 ? `Tasks done - ${dones.length}` : todos.length > 0 ? `Tasks done - ${dones.length}` : ''}</h1>
          </div>
          <div>
            {current === 'toDo' && <>
              {todos.length > 0 ? todos.map((item: Todo, index: number) => {
                return <div key={item.id} className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
                  <div>
                    <h1 className='text-[#9E78CF] font-inter text-[16px]'>{item.todo}</h1>
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <img
                        onClick={() => addDoneTodos(item, index)}
                        src={Tick}
                        className="me-4 cursor-pointer transform ease-in-out transition-transform duration-300 w-[18px] h-[19px] hover:w-[20px] hover:h-[20px]"
                        alt="Done"
                      />
                      <img
                        src={Pen}
                        onClick={() => openModal(index, 'toDo')}
                        className="me-4 cursor-pointer transform ease-in-out transition-transform duration-300 w-[18px] h-[19px] hover:w-[20px] hover:h-[20px]"
                        alt="Done"
                      />
                      <img onClick={() => deleteTodo(index, 'toDo')} src={Trash} className="cursor-pointer transform ease-in-out transition-transform duration-300 w-[18px] h-[19px] hover:w-[20px] hover:h-[20px]" alt="Delete" />
                    </div>
                  </div>
                </div>
              }) : <div className='mt-3 flex h-[72px] justify-center items-center'>
                <h1>No Todos Found</h1>
              </div>}
            </>}
            {current === 'done' && <>
              {dones.length > 0 ? dones.map((item: Dones, index: number) => {
                return <div key={item.id} className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
                  <div>
                    <h1 className='text-[#9E78CF] font-inter text-[16px]'>{item.done}</h1>
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <img
                        src={Pen}
                        onClick={() => openModal(index, 'done')}
                        className="me-4 cursor-pointer transform ease-in-out transition-transform duration-300 w-[18px] h-[19px] hover:w-[20px] hover:h-[20px]"
                        alt="Done"
                      />
                      <img onClick={() => deleteTodo(index, 'done')} src={Trash} className="cursor-pointer transform ease-in-out transition-transform duration-300 w-[18px] h-[19px] hover:w-[20px] hover:h-[20px]" alt="Delete" />
                    </div>
                  </div>
                </div>
              }) : <div className='mt-3 flex h-[72px] justify-center items-center'>
                <h1>No Todos Found</h1>
              </div>}
            </>}
          </div>
        </div>
      </div>
      <dialog ref={modalRef} id="my_modal_4" className="modal w-full flex justify-center">
        <div className="modal-box bg-[#1D1825] me-[17px] max-w-[500px]">
          <h3 className="text-lg text-center font-bold">Edit To Do!</h3>
          <div className="modal-action">
            <form onSubmit={editTodo} className='flex flex-col w-full' method="dialog">
              <input type="text" value={edit} onChange={e => setEdit(e.target.value)} placeholder="Edit" className="input me-4 focus:outline-offset-2 focus:outline-[#9E78CF] focus-within:outline-offset-2 focus-within:outline-[#9E78CF] bg-[#1D1825] border-[#9E78CF] w-full" />
              <div className='w-full text-end mt-[15px]'>
              <button className="btn hover:bg-[#1D1825] hover:text-[#b984ff] text-white bg-[#9E78CF]">Button</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default App