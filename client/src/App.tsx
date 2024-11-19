import Plus from './assets/Vector.png';
import Tick from './assets/Vector (1).png';
import Trash from './assets/Vector (2).png';
import Pen from './assets/editing.png';
import "@fontsource/inter/400.css";
import './index.css'
import "@fontsource/inter/700.css";
import { useRef, useState } from 'react';
const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Dones[]>([]);
  const [input, setInput] = useState<string>('');
  const [current, setCurrent] = useState<'toDo' | 'done'>('toDo');
  const modalRef = useRef<any>()
  interface Todo {
    todo: string,
    id: number
  }
  interface Dones {
    todo: string,
    id: number
  }
  const addTodo = () => {
    todos.push({
      todo: input,
      id: Date.now()
    });
    setTodos(todos);
    setInput('')
  }
  const addDoneTodos = (obj: { todo: string, id: number }, index: number) => {
    setDones([...dones, { todo: obj.todo, id: Date.now() }]);
    todos.splice(index, 1)
    setTodos(todos)
    setInput('')
  }
  const deleteTodo = (index: number, current: string) => {
    if (current === 'toDo') {
      const filteredTodos = todos.filter((_, i) => i !== index)
      setTodos(filteredTodos)
      return
    }
    if (current === 'done') {
      const filteredDones = dones.filter((_, i) => i !== index)
      setDones(filteredDones)
    }
  }
  const openModal = (index: number, current: string) => {
    document.documentElement.classList.add("modal-open");
    modalRef.current.showModal();
  }
  const editTodo = () => {
    document.documentElement.classList.remove("modal-open");
    modalRef.current.close();
  }
  return (
    <>
      <div className="bg-[#0D0714] h-full min-h-[100vh] w-full flex justify-center items-start">
        <div className="text-center bg-[#1D1825] w-full my-20 max-w-[600px] p-8">
          <div className="flex items-center">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Add To Do" className="input me-4 focus:outline-offset-2 focus:outline-[#9E78CF] focus-within:outline-offset-2 focus-within:outline-[#9E78CF] bg-[#1D1825] border-[#9E78CF] w-full" />
            <div onClick={addTodo} className='bg-[#9E78CF] cursor-pointer active:bg-[#7d49c0] hover:bg-[#9064c9] p-[10px] rounded-md'>
              <img src={Plus} alt="Add To Do" />
            </div>
          </div>
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
                    <h1 className='text-[#9E78CF] font-inter text-[16px]'>{item.todo}</h1>
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <img
                        src={Pen}
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
        <div className="modal-box me-[17px] max-w-[500px]">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action">
            <form onSubmit={editTodo} method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default App