import { useCallback, useEffect, useRef, useState } from 'react'


function App() {

  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef()

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbersAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*+_-"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numbersAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, setPassword])

  const CopyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,10) //this will only select 10 characters
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className=' bg-gray-800 h-44 w-full md:w-1/2 m-auto rounded-md'>
        <div className=' mt-16 text-white text-center text-3xl p-1'>Password Generator</div>
        <div className='p-3 m-auto flex justify-center align-middle'>
          <input className='rounded-sm w-4/5 h-7 p-1 outline-none text-xl ' type='text'
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='bg-blue-600 text-white text-xl rounded-e-lg ' onClick={CopyToClipboard}>Copy</button>
        </div>


        <div className='text-white flex p-2 justify-center text-base align-middle '>
          <input className='cursor-pointer' type='range'
            min={6}
            max={25}
            onChange={(e) => { setLength(e.target.value) }}
          />&nbsp;
          <label className='mr-3'>Length: {length}</label>


          <input
            type='checkbox'
            defaultChecked={numbersAllowed}
            onChange={() => {
              setNumbersAllowed((prev) => !prev)
            }}
          />
          <label className='mr-2 ml-1'>Numbers</label>

          <input type='checkbox'
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label className='mr-2 ml-1'>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App




