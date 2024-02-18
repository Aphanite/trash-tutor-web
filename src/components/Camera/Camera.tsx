import React from 'react'
import styles from './Camera.module.css'
import { usePage } from '../../providers/PageProvider'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function Camera() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  console.log('isSmallDevice', isSmallDevice)

  const width = isSmallDevice ? window.innerWidth : 390
  const height = isSmallDevice ? window.innerHeight : 844

  const { navigate } = usePage()

  function takePicture() {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = width
    canvas.height = height

    context?.drawImage(videoRef.current, 0, 0, width, height)

    const uri = canvas.toDataURL('image/png')
    console.log('data', uri)
    navigate('imagePreview', { uri })
  }

  React.useEffect(() => {
    let stream: MediaStream

    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { width, height } })
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
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      {/* {src && <img src={src} alt="The screen capture will appear in this box." />} */}
    </>
  )
}

export default Camera
