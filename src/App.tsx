import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './layouts/Main'
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hook'
import { setUser } from './redux/features/user/userSlice'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    const id = localStorage.getItem("id")
    if (token && email && id) {
      const payload = {
        accessToken: token,
        email,
        _id: id
      }
      dispatch(setUser(payload))
    }
  }, [dispatch])

  return (
    <div>
      <Main></Main>
    </div>
  )
}

export default App
