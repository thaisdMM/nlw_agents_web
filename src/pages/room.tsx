// cria uma sala no create room e entra nela por esse room aqui - vão estar as perguntas e respostas...

import { Navigate, useParams } from 'react-router-dom'

type RoomParams = {
  roomId: string
}

export function Room() {
  const params = useParams<RoomParams>()

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return <div>Room Details {JSON.stringify(params)} </div>
}
