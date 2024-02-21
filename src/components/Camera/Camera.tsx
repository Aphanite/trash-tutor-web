import React from 'react'
import styles from './Camera.module.css'
import { usePage } from '../../providers/PageProvider'
import { Maximize } from 'react-feather'

function Camera() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const streamRef = React.useRef(null)

  const { navigate } = usePage()

  function stopVideo(stream: any) {
    stream.getTracks().forEach(track => {
      console.log('stopping', track)
      track.stop()
    })
  }

  React.useEffect(() => {
    console.log('videoref useeffect')

    if (!navigator.mediaDevices?.getUserMedia) return

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(mediaStream => {
        console.log('gotStream')
        if (streamRef.current) stopVideo(streamRef.current)

        streamRef.current = mediaStream

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      })
      .catch(reason => {
        console.log(reason)
      })

    return () => {
      // on component cleanup, we stop video tracks
      console.log('unmounting!')
      if (streamRef.current) stopVideo(streamRef.current)
    }
  }, [])

  return (
    <>
      <div className={`container ${styles.container}`}>
        <video ref={videoRef} playsInline autoPlay />
        <button className={styles.btn} onClick={takePicture}>
          <Maximize size={24} color="#f8faed" />
        </button>
      </div>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </>
  )
}

export default Camera
