/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

// vai verificar se o navegador do usuário permite gravação ou não
const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
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
    recorder.current = new MediaRecorder(audio, {
      //mimeType é o formato para gravar o audio
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })
    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        console.log(event.data)
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
