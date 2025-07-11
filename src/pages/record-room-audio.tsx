/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// vai verificar se o navegador do usuário permite gravação ou não
const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  // stop da gravação manualmente feito pelo usuário
  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
    // limpa o histórico para não fazer invervalRef novamente
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }
  // enviar arquivos para backend
  async function uploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )
    const result = await response.json()
    console.log(result)
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      //mimeType é o formato para gravar o audio
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!')
    }

    recorder.current.onstop = () => {
      console.log('Gravaçao encerrada/pausada.')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação.')
      return
    }

    setIsRecording(true)
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)

    // vai pegando o áudio em intervalos como for definido abaixo em segundos
    intervalRef.current = setInterval(() => {
      recorder.current?.stop()

      createRecorder(audio)
    }, 10_000)
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  )
}
