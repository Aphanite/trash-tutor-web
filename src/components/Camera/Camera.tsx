import React from 'react'
import styles from './Camera.module.css'
import { usePage } from '../../providers/PageProvider'

function Camera() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const { navigate } = usePage()

  function takePicture() {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = 390
    canvas.height = 844
    context?.drawImage(videoRef.current, 0, 0, 390, 844)

    const uri = canvas.toDataURL('image/png')
    console.log('data', uri)
    navigate('imagePreview', { uri })
  }

  React.useEffect(() => {
    let stream: MediaStream

    const constraints = {
      //   video: true,
      video: { width: 390, height: 844 },
    }

    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(mediaStream => {
          stream = mediaStream

          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play()
            }
          }
        })
        .catch(err => {
          console.error(`${err.name}: ${err.message}`)
        })

      return () => {
        // on component cleanup, we stop video tracks
        console.log('unmounting!')
        console.log('stream', stream)

        stream?.getTracks().forEach(track => {
          track.stop()
        })
      }
    }
  }, [])

  return (
    <>
      <div className={styles.cameraContainer}>
        <video ref={videoRef} />
        <button className={styles.btn} onClick={takePicture}>
          Take photo
        </button>
      </div>
      <canvas ref={canvasRef}></canvas>
      {/* {src && <img src={src} alt="The screen capture will appear in this box." />} */}
    </>
  )
}

export default Camera
