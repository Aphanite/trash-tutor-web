import React from 'react'
import styles from './Camera.module.css'
import { usePage } from '../../providers/PageProvider'
import { Maximize } from 'react-feather'

function Camera() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  // const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')

  // const width = isSmallDevice ? window.innerWidth : 390
  // const height = isSmallDevice ? window.innerHeight : 844

  const { navigate } = usePage()

  function takePicture() {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = width
    canvas.height = height

    context?.drawImage(videoRef.current, 0, 0, width, height)
    const uri = canvas.toDataURL('image/png')

    navigate('imagePreview', { uri })
  }

  React.useEffect(() => {
    let stream: MediaStream

    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
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
      <div className={`container ${styles.container}`}>
        <video ref={videoRef} />
        {/*<button className={styles.btn} onClick={takePicture}>*/}
        {/*  <Maximize size={24} color="#f8faed" />*/}
        {/*</button>*/}
      </div>
      {/*<canvas ref={canvasRef} className={styles.canvas}></canvas>*/}
    </>
  )
}

export default Camera
