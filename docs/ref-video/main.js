'use strict'

const videoElement = document.querySelector('video')

function gotStream(stream) {
  window.stream = stream // make stream available to console
  videoElement.srcObject = stream
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop()
    })
  }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(gotStream)
}

start()
