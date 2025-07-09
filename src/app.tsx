import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateRoom } from './pages/create-room'
import { Room } from './pages/room'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rota inicial que é quando acessa o app */}
        <Route element={<CreateRoom />} index />
        <Route element={<Room />} path="/room" />
      </Routes>
    </BrowserRouter>
  )
}
