import Plus from './assets/Vector.png';
import Tick from './assets/Vector (1).png';
import Trash from './assets/Vector (2).png';
import "@fontsource/inter/400.css"; // Regular weight.
import "@fontsource/inter/700.css"; // Bold weight.
const App = () => {
  return (
    <div className="bg-[#0D0714] h-full min-h-[100vh] flex justify-center items-start">
      <div className="text-center bg-[#1D1825] w-full my-20 max-w-[600px] p-8">
        <div className="flex items-center">
          <input type="text" placeholder="Add To Do" className="input me-4 bg-[#1D1825] border-[#9E78CF] w-full" />
          <div className='bg-[#9E78CF] cursor-pointer active:bg-[#7d49c0] hover:bg-[#9064c9] p-[10px] rounded-md'>
            <img src={Plus} alt="Add To Do" />
          </div>
        </div>
        <div className='w-full flex justify-between items-center mt-10'>
          <h1 className='text-[16px] font-inter text-white'>Tasks to do - 4</h1>
          <h1 className='text-[16px] font-inter text-white'>Tasks done - 4</h1>
        </div>
        <div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img
                  src={Tick}
                  className="me-4 cursor-pointer transform transition-transform duration-300 hover:scale-120"
                  alt="Done"
                />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
          <div className='bg-[#15101C] rounded-xl flex justify-between mt-3 items-center p-6'>
            <div>
              <h1 className='text-[#9E78CF] font-inter text-[16px]'>To study React fundamentals</h1>
            </div>
            <div>
              <div className='flex'>
                <img src={Tick} className='me-4' alt="Done" />
                <img src={Trash} className='' alt="Delete" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App