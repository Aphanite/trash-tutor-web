import React from 'react'
import styles from './Camera.module.css'
import { usePage } from '../../providers/PageProvider'
import { Maximize } from 'react-feather'

function Camera() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const streamRef = React.useRef(null)

  const { navigate } = usePage()

  function takePicture() {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const videoElWidth = videoRef.current.clientWidth
    const videoElHeight = videoRef.current.clientHeight

    const videoStreamWidth = videoRef.current.videoWidth
    const videoStreamHeight = videoRef.current.videoHeight

    // Determine the largest dimension of video that fits within element
    const ratio = Math.min(videoStreamWidth / videoElWidth, videoStreamHeight / videoElHeight)

    const width = videoElWidth * ratio
    const height = videoElHeight * ratio

    const left = (videoStreamWidth - width) / 2
    const top = (videoStreamHeight - height) / 2

    canvas.width = videoElWidth
    canvas.height = videoElHeight

    context?.drawImage(
      videoRef.current,
      left,
      top,
      width,
      height,
      0,
      0,
      videoElWidth,
      videoElHeight,
    )

    const uri = canvas.toDataURL('image/png')
    navigate('imagePreview', { uri })
  }

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
        <button className={styles.shutterButton} onClick={takePicture}>
          <Maximize size={24} color="#f8faed" />
        </button>
      </div>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </>
  )
}

export default Camera
