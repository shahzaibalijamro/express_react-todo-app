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
    axios("http://localhost:3000/api/v1/alltodos")
    .then(res => {
      console.log(res.data);
      const incomplete = res.data.allTodos.filter((item:{done:boolean}) => item.done === false)
      setTodos(incomplete)
      const completed = res.data.allTodos.filter((item:{done:boolean}) => item.done === true)
      setDones(completed)
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  //interfaces
  interface Todo {
    title: string,
    _id: string
  }
  interface Dones {
    title: string,
    _id: string
  }

  //adds Todos
  const addTodo = async (e:any) => {
    e.preventDefault();
    detectScrollbar()
    try {
      const newTodo = await axios.post("http://localhost:3000/api/v1/addtodo",{
        "title" : input
      })
      setTodos([...todos,newTodo.data.todo]);
    } catch (error:any) {
      console.log(error.message);
    }
    setInput('')
  }

  //adds Dones
  const addDoneTodos = async (obj: { title: string, _id: string }, index: number) => {
    try {
      const newDone = await axios.put(`http://localhost:3000/api/v1/adddone/${obj._id}`)
      if (!newDone) {
        return console.log('Something went wrong!')
      }
      setDones([...dones, newDone.data.done]);
      setTodos(todos.filter((_, i) => i !== index))
    } catch (error) {
      console.log(error);
    }
    setInput('')
  }

  //deletes Todos
  const deleteTodo = async (obj: { title: string, _id: string }, index: number, current: string) => {
    try {
      const deletedTodo = await axios.delete(`http://localhost:3000/api/v1/deletetodo/${obj._id}`)
      if (!deletedTodo) {
        return console.log('Something went wrong!')
      }
      if (current === 'toDo') {
        setTodos(todos.filter((_, i) => i !== index))
        return
      }
      if (current === 'done') {
        const filteredDones = dones.filter((_, i) => i !== index)
        setDones(filteredDones)
      }
    } catch (error) {
      console.log(error);
    }
    detectScrollbar()
  }

  //opens modal
  const openModal = (index: number, current: string) => {
    document.documentElement.classList.add("modal-open");
    modalRef.current.showModal();
    if (current === 'toDo') {
      setEdit(todos[index].title)
    }
    if (current === 'done') {
      setEdit(dones[index].title)
      setCurrentEdit('done')
    }
    setEditIndex(index)
    console.log(edit, '=> edit');
    console.log(editIndex, '=> edit index');
    detectScrollbar();
  }

  //edits Todos
  const editTodo = async () => {
    try {
      if (currentEdit === 'done') {
        const updatedTodo = await axios.put(`http://localhost:3000/api/v1/edittodo/${dones[editIndex]._id}`,{
          "title" : edit
        })
        if (!updatedTodo) {
          return console.log('Something went wrong!')
        }
        dones[editIndex].title = edit;
        setDones([...dones])
        setCurrentEdit(null)
        return
      }
      const updatedTodo = await axios.put(`http://localhost:3000/api/v1/edittodo/${todos[editIndex]._id}`,{
        "title" : edit
      })
      if (!updatedTodo) {
        return console.log('Something went wrong!')
      }
      todos[editIndex].title = edit;
      setTodos([...todos])
      document.documentElement.classList.remove("modal-open");
      modalRef.current.close();
      setEditIndex(0)
      setCurrentEdit(null)
    } catch (error) {
      console.log(error);
    }
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
                return <div key={item._id} className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
                  <div>
                    <h1 className='text-[#9E78CF] font-inter text-[16px]'>{item.title}</h1>
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
                      <img onClick={() => deleteTodo(item, index, 'toDo')} src={Trash} className="cursor-pointer transform ease-in-out transition-transform duration-300 w-[18px] h-[19px] hover:w-[20px] hover:h-[20px]" alt="Delete" />
                    </div>
                  </div>
                </div>
              }) : <div className='mt-3 flex h-[72px] justify-center items-center'>
                <h1>No Todos Found</h1>
              </div>}
            </>}
            {current === 'done' && <>
              {dones.length > 0 ? dones.map((item: Dones, index: number) => {
                return <div key={item._id} className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
                  <div>
                    <h1 className='text-[#9E78CF] font-inter text-[16px]'>{item.title}</h1>
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <img
                        src={Pen}
                        onClick={() => openModal(index, 'done')}
                        className="me-4 cursor-pointer transform ease-in-out transition-transform duration-300 w-[18px] h-[19px] hover:w-[20px] hover:h-[20px]"
                        alt="Done"
                      />
                      <img onClick={() => deleteTodo(item,index, 'done')} src={Trash} className="cursor-pointer transform ease-in-out transition-transform duration-300 w-[18px] h-[19px] hover:w-[20px] hover:h-[20px]" alt="Delete" />
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
              <button className="btn hover:bg-[#1D1825] hover:text-[#b984ff] text-white bg-[#9E78CF]">Edit</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default App