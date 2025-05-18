import './App.css'
import logo from './assets/logo.png'
import { Dashboard } from './components/Dashboard'
import { Buffer } from 'buffer';
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}
window.Buffer = Buffer;
function App() {

  return (
    <>
      <div className="flex-col justify-center h-screen bg-gray-950">
        <div className="max-h-20">
          <div className='p-4'>
            <img className="h-16 bg-grey" src={logo} alt="Logo" />
          </div>
        </div>
        <div className='flex justify-center'>
          <Dashboard />
        </div>
      </div>
    </>
  )
}

export default App
